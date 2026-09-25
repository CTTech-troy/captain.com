import type { AboutChapter } from '../types/content';

export const aboutChapters: AboutChapter[] = [
{
  id: 'who-we-are',
  label: 'Who we are',
  title: 'An engineering company for the systems businesses run on.',
  body: [
  'Ctrotech.com is an international software engineering and technology company. We design, build, secure, automate and operate software for businesses, startups, enterprises and organisations.',
  'We are not a collection of disconnected digital services. Everything we do serves one purpose: giving organisations technology they can depend on.']

},
{
  id: 'what-we-build',
  label: 'What we build',
  title: 'From a single application to the infrastructure of a business.',
  body: [
  'We build web and mobile applications, enterprise platforms, AI automation, embedded systems and the cloud infrastructure beneath them.',
  'Increasingly, we build complete business operating systems — the connected platforms that run finance, people, inventory, customers and operations.'],

  points: ['Software engineering', 'AI automation', 'Cybersecurity', 'Cloud infrastructure', 'Business operating systems', 'Digital performance']
},
{
  id: 'how-we-work',
  label: 'How we work',
  title: 'Small senior teams, clear architecture, visible progress.',
  body: [
  'Every engagement begins by understanding the business, not the feature list. We define architecture and security before writing code, then deliver working software in short, reviewable increments.',
  'You always know what is being built, why, and what comes next.']

},
{
  id: 'engineering',
  label: 'Engineering philosophy',
  title: 'Boring where it matters. Ambitious where it counts.',
  body: [
  'We choose proven technology for foundations and reserve innovation for the parts that differentiate your business. Code is tested, reviewed, documented and built to be maintained by people who did not write it.'],

  points: ['Readable, tested code', 'Architecture decisions documented', 'Automated delivery pipelines']
},
{
  id: 'security',
  label: 'Security philosophy',
  title: 'Security is a property of the system, not a phase.',
  body: [
  'We threat-model during architecture, review code as we build, test before release and monitor after launch. Because we also offer security as a service, our engineers think like attackers from the first line of code.'],

  points: ['Secure by design', 'Tested before launch', 'Monitored in production']
},
{
  id: 'ai',
  label: 'Our AI approach',
  title: 'Useful, grounded and supervised.',
  body: [
  'We apply AI where it removes real work: reading documents, answering questions, routing decisions. Agents are grounded in your data, scoped to the access they need, and supervised by people where judgment matters.'],

  points: ['Grounded in your knowledge', 'Scoped permissions', 'Human review built in']
},
{
  id: 'support',
  label: 'Long-term support',
  title: 'We don’t disappear after deployment.',
  body: [
  'Software needs maintenance, monitoring, security and continuous improvement. We operate what we build — and what others built — for as long as it matters to you.']

}];