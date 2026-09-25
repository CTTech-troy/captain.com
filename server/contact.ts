import type { IncomingMessage, ServerResponse } from 'node:http';
import { budgetRanges, projectTypes, serviceOptions, timelines } from '../src/data/contact.ts';

const fields = {
  name: 'Name', company: 'Company', email: 'Email', country: 'Country',
  website: 'Company website', projectType: 'Project type', services: 'Services required',
  budget: 'Budget range', timeline: 'Timeline', currentTechnology: 'Current technology',
  description: 'Project description', securityRequirements: 'Security requirements',
  additionalInfo: 'Additional information'
} as const;
type Brief = Record<Exclude<keyof typeof fields, 'services'>, string> & { services: string[] };
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const maxBodyBytes = 64 * 1024;

function validate(input: unknown): Brief | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const source = input as Record<string, unknown>;
  const brief = {} as Brief;
  for (const key of Object.keys(fields) as (keyof Brief)[]) {
    if (key === 'services') {
      if (!Array.isArray(source.services) || source.services.length > serviceOptions.length ||
          !source.services.every((value) => typeof value === 'string' && serviceOptions.includes(value))) return null;
      brief.services = [...new Set(source.services as string[])];
    } else {
      const value = source[key] ?? '';
      const limit = ['description', 'securityRequirements', 'additionalInfo'].includes(key) ? 10000 : 500;
      if (typeof value !== 'string' || value.length > limit) return null;
      brief[key] = value.trim();
    }
  }
  if (!brief.name || !emailPattern.test(brief.email) || brief.email.length > 254 ||
      /[\r\n]/.test(brief.name) || brief.description.length < 20 ||
      !projectTypes.includes(brief.projectType) ||
      (brief.budget && !budgetRanges.includes(brief.budget)) ||
      (brief.timeline && !timelines.includes(brief.timeline)) ||
      (brief.website && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(brief.website))) return null;
  return brief;
}

export function createContactHandler(env: NodeJS.ProcessEnv = process.env, send = fetch) {
  // Per-instance abuse protection; use hosting-level rate limits for multiple instances.
  const attempts = new Map<string, { count: number; expires: number }>();
  return async (req: IncomingMessage & { body?: unknown }, res: ServerResponse) => {
    const respond = (status: number, data: Record<string, unknown>) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify(data));
    };
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return respond(405, { error: 'Method not allowed.' });
    }
    if (!req.headers['content-type']?.toLowerCase().startsWith('application/json')) {
      return respond(415, { error: 'Expected JSON.' });
    }
    const now = Date.now();
    for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
    const forwarded = req.headers['x-forwarded-for'];
    const ip = env.VERCEL && typeof forwarded === 'string'
      ? forwarded.split(',')[0].trim() : req.socket.remoteAddress ?? 'unknown';
    const attempt = attempts.get(ip) ?? { count: 0, expires: now + 60_000 };
    if (attempt.count >= 5) {
      res.setHeader('Retry-After', String(Math.ceil((attempt.expires - now) / 1000)));
      return respond(429, { error: 'Please wait a minute before trying again.' });
    }
    attempt.count++;
    attempts.set(ip, attempt);
    let input: unknown;
    try {
      // Vercel parses JSON before invoking Node handlers; Vite supplies a stream.
      if (req.body !== undefined) {
        const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        if (Buffer.byteLength(raw) > maxBodyBytes) return respond(413, { error: 'Brief is too large.' });
        input = JSON.parse(raw);
      } else {
      const chunks: Buffer[] = [];
      let size = 0;
      for await (const chunk of req) {
        const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        size += bytes.length;
        if (size > maxBodyBytes) return respond(413, { error: 'Brief is too large.' });
        chunks.push(bytes);
      }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      }
    } catch {
      return respond(400, { error: 'Invalid request.' });
    }
    const brief = validate(input);
    if (!brief) return respond(400, { error: 'Please check your brief and required fields.' });
    const requestId = req.headers['idempotency-key'];
    if (typeof requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(requestId)) {
      return respond(400, { error: 'Invalid submission ID.' });
    }
    const from = env.CONTACT_FROM_EMAIL?.trim();
    const to = env.CONTACT_TO_EMAIL?.trim();
    if (!env.RESEND_API_KEY || !from || !to || !emailPattern.test(to)) {
      return respond(503, { error: 'Email service is not configured yet.' });
    }
    const text = ['New project brief — Ctrotech.com', '', ...Object.entries(fields).map(([key, label]) => {
      const value = brief[key as keyof Brief];
      return `${label}:\n${(Array.isArray(value) ? value.join(', ') : value) || 'Not provided'}`;
    })].join('\n\n');
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `contact/${requestId}`
        },
        body: JSON.stringify({ from, to: [to], reply_to: brief.email,
          subject: `New project brief: ${brief.name} — ${brief.projectType}`, text }),
        signal: AbortSignal.timeout(15_000)
      });
      const result = await response.json() as { id?: string };
      if (!response.ok || !result.id) return respond(502, { error: 'Unable to send your brief. Please try again.' });
      return respond(200, { success: true });
    } catch {
      return respond(502, { error: 'Unable to send your brief. Please try again.' });
    }
  };
}
