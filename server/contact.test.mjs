import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { createContactHandler } from './contact.ts';

const env = {
  RESEND_API_KEY: 'test-key',
  CONTACT_FROM_EMAIL: 'Ctrotech <support@ctrotech.com>',
  CONTACT_TO_EMAIL: 'support@ctrotech.com'
};
const brief = {
  name: 'Test Visitor', company: 'Example Company', email: 'visitor@example.com',
  country: 'Nigeria', website: 'example.com', projectType: 'Website',
  services: ['Web development', 'SEO'], budget: 'Under $10k', timeline: 'Flexible',
  currentTechnology: 'WordPress', description: 'Build a new customer portal for our business.',
  securityRequirements: 'Private customer accounts', additionalInfo: 'Please reply by email.'
};

async function setup(t, send, settings = env, parsed = false) {
  const handler = createContactHandler(settings, send);
  const server = createServer(async (req, res) => {
    if (parsed) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      req.body = JSON.parse(Buffer.concat(chunks).toString());
    }
    await handler(req, res);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => { server.close(resolve); server.closeAllConnections(); }));
  return (body = brief, options = {}) => fetch(`http://127.0.0.1:${server.address().port}/api/contact`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID() },
    body: JSON.stringify(body), ...options
  });
}

for (const parsed of [false, true]) {
  test(`sends all 13 fields, fixed recipient and reply-to (${parsed ? 'Vercel' : 'Vite'})`, async (t) => {
    let payload;
    const requestId = randomUUID();
    const post = await setup(t, async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      assert.equal(options.headers.Authorization, 'Bearer test-key');
      assert.equal(options.headers['Idempotency-Key'], `contact/${requestId}`);
      payload = JSON.parse(options.body);
      return Response.json({ id: 'email-id' });
    }, env, parsed);
    const response = await post({ ...brief, to: 'attacker@example.com' }, {
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': requestId }
    });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    assert.deepEqual(payload.to, ['support@ctrotech.com']);
    assert.equal(payload.from, env.CONTACT_FROM_EMAIL);
    assert.equal(payload.reply_to, brief.email);
    for (const value of Object.values(brief).flat()) assert.ok(payload.text.includes(value));
  });
}

test('rejects invalid input before calling Resend', async (t) => {
  const post = await setup(t, async () => { assert.fail('Must not send invalid input'); });
  for (const body of [null, { ...brief, email: 'bad\r\nemail' }, { ...brief, services: [123] },
    { ...brief, description: 'too short' }, { ...brief, name: 'a'.repeat(501) }]) {
    assert.equal((await post(body)).status, 400);
  }
});

test('rejects oversized payloads', async (t) => {
  const post = await setup(t, async () => { assert.fail('Must not send oversized input'); });
  assert.equal((await post({ ...brief, description: 'x'.repeat(70000) })).status, 413);
});

test('returns failure for missing configuration, provider errors and network errors', async (t) => {
  const unconfigured = await setup(t, async () => { assert.fail('Must not send without configuration'); }, {});
  assert.equal((await unconfigured()).status, 503);
  for (const send of [async () => Response.json({ message: 'secret provider detail' }, { status: 403 }),
    async () => { throw new Error('network failure'); }, async () => Response.json({})]) {
    const post = await setup(t, send);
    const response = await post();
    assert.equal(response.status, 502);
    assert.equal((await response.json()).success, undefined);
  }
});

test('rejects wrong methods, malformed JSON, missing IDs and excessive requests', async (t) => {
  const post = await setup(t, async () => Response.json({ id: 'email-id' }));
  assert.equal((await post(brief, { method: 'GET', body: undefined })).status, 405);
  assert.equal((await post(brief, { headers: { 'Content-Type': 'text/plain' } })).status, 415);
  assert.equal((await post(brief, { body: '{invalid' })).status, 400);
  assert.equal((await post(brief, { headers: { 'Content-Type': 'application/json' } })).status, 400);
  for (let i = 0; i < 3; i++) assert.equal((await post()).status, 200);
  const limited = await post();
  assert.equal(limited.status, 429);
  assert.ok(limited.headers.get('retry-after'));
});
