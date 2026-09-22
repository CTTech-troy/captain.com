import type { ServicePage } from '../types/content';

export const platformServicePages: ServicePage[] = [
{
  slug: 'ai-automation',
  pillar: 'intelligence',
  icon: 'bot',
  title: 'AI Automation',
  metaTitle: 'AI Automation, AI Agents & Workflow Automation',
  metaDescription:
  'AI agents and automated workflows that process documents, support customers and keep business systems in sync — designed and operated by Captain.com.',
  heroTitle: 'Turn manual work into software.',
  heroCopy:
  'AI agents and automated workflows that read documents, answer customers, make routine decisions and keep your systems in sync.',
  problem: {
    title: 'Skilled people doing repetitive work.',
    body: 'Teams spend hours copying data between systems, answering the same questions and processing documents by hand. It is slow, error-prone and hard to scale.',
    points: ['Manual data entry across tools', 'Slow response to customers', 'Knowledge locked in inboxes and files']
  },
  solution: {
    title: 'Automation with judgment built in.',
    body: 'We design AI systems grounded in your data and rules — with human review where it matters, full logging and measurable operation.',
    points: ['Agents grounded in your own knowledge', 'Human-in-the-loop approvals', 'Observable, auditable automations']
  },
  capabilities: [
  { title: 'AI agents', body: 'Sales, customer support, voice and internal assistants.' },
  { title: 'Document processing', body: 'Extraction, classification and validation of documents.' },
  { title: 'Workflow automation', body: 'Multi-step processes across CRM, email and ERP.' },
  { title: 'AI reporting', body: 'Summaries and insight generated from operational data.' }],

  process: [
  { title: 'Opportunity mapping', body: 'Where automation removes the most manual effort.' },
  { title: 'Data & guardrails', body: 'Knowledge sources, permissions and review rules.' },
  { title: 'Supervised pilot', body: 'Running alongside your team with human approval.' },
  { title: 'Scale & monitor', body: 'Expanded coverage with quality monitoring.' }],

  technology: ['LLM APIs', 'AI Agents', 'RAG', 'Machine Learning', 'Python', 'Node.js', 'PostgreSQL'],
  security: ['Data access scoped to each agent', 'Prompt injection and data leakage testing', 'Logged, reviewable automated decisions'],
  industries: ['professional-services', 'ecommerce', 'healthcare', 'real-estate']
},
{
  slug: 'cybersecurity',
  pillar: 'security',
  icon: 'shield',
  title: 'Cybersecurity',
  metaTitle: 'Cybersecurity as a Service & Penetration Testing',
  metaDescription:
  'Penetration testing, application, API and cloud security, and continuous security monitoring — delivered as a service by Captain.com engineers.',
  heroTitle: 'Build secure. Stay secure.',
  heroCopy:
  'Penetration testing, application and cloud security, and ongoing monitoring — delivered as a service by engineers who also build software.',
  problem: {
    title: 'Security reviewed too late, or never.',
    body: 'Most vulnerabilities are introduced during development and found — if at all — after launch. Point-in-time audits leave long gaps in between.',
    points: ['Untested applications and APIs', 'Misconfigured cloud environments', 'No visibility into ongoing threats']
  },
  solution: {
    title: 'Security as a continuous service.',
    body: 'We test like attackers, fix like engineers and monitor continuously — embedding security into how your software is built and run.',
    points: ['Offensive testing with clear remediation', 'Security integrated into CI/CD', 'Continuous vulnerability management']
  },
  capabilities: [
  { title: 'Penetration testing', body: 'Web, mobile, API and infrastructure testing.' },
  { title: 'Application & API security', body: 'Secure code review and threat modelling.' },
  { title: 'Cloud security', body: 'Configuration review and hardening across providers.' },
  { title: 'Security monitoring', body: 'Detection, alerting and vulnerability management.' }],

  process: [
  { title: 'Scope & threat model', body: 'Assets, attackers and risks prioritised.' },
  { title: 'Test', body: 'Manual and automated testing against the scope.' },
  { title: 'Remediate', body: 'Developer-ready guidance, or we fix it with you.' },
  { title: 'Retest & monitor', body: 'Fixes verified and systems watched continuously.' }],

  technology: ['Application Security', 'API Security', 'Cloud Security', 'DevSecOps', 'Penetration Testing', 'AWS', 'Azure', 'Google Cloud'],
  security: ['Findings prioritised by business risk', 'Remediation guidance developers can act on', 'Retesting to verify every fix'],
  industries: ['fintech', 'healthcare', 'government', 'ecommerce']
},
{
  slug: 'cloud-infrastructure',
  pillar: 'operate',
  icon: 'cloud',
  title: 'Cloud Infrastructure',
  metaTitle: 'Cloud Infrastructure, DevOps & CI/CD Services',
  metaDescription:
  'Cloud architecture, DevOps, containers, monitoring and disaster recovery across AWS, Azure and Google Cloud — engineered by Captain.com.',
  heroTitle: 'Infrastructure that stays up as you scale.',
  heroCopy:
  'Cloud architecture, DevOps and CI/CD, containers, monitoring and disaster recovery across AWS, Azure and Google Cloud.',
  problem: {
    title: 'Fragile infrastructure, rising bills.',
    body: 'Manual deployments, undocumented servers and untested backups turn every release into a risk — while unmanaged cloud spend grows quietly.',
    points: ['Manual, risky deployments', 'No tested backup or recovery plan', 'Unpredictable cloud costs']
  },
  solution: {
    title: 'Automated, observable, recoverable.',
    body: 'We define infrastructure as code, automate delivery and build the monitoring and recovery you need before you need it.',
    points: ['Infrastructure as code', 'Automated CI/CD pipelines', 'Tested backup and disaster recovery']
  },
  capabilities: [
  { title: 'Cloud architecture', body: 'Right-sized, multi-environment designs on AWS, Azure or Google Cloud.' },
  { title: 'Containers & orchestration', body: 'Docker and Kubernetes platforms your team can operate.' },
  { title: 'CI/CD & DevOps', body: 'Every change built, tested and deployed automatically.' },
  { title: 'Monitoring & recovery', body: 'Observability, alerting, backups and failover drills.' }],

  process: [
  { title: 'Assessment', body: 'Current environment, risks and costs reviewed.' },
  { title: 'Target architecture', body: 'Designed for reliability, security and cost.' },
  { title: 'Migrate & automate', body: 'Incremental moves with zero-surprise cutovers.' },
  { title: 'Operate & optimise', body: 'Ongoing monitoring and cost optimisation.' }],

  technology: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'PostgreSQL', 'Redis'],
  security: ['Least-privilege identity and access management', 'Network segmentation and encryption', 'Security baselines enforced in code'],
  industries: ['startups', 'fintech', 'ecommerce', 'government']
},
{
  slug: 'business-operating-systems',
  pillar: 'intelligence',
  icon: 'layout',
  title: 'Business Operating Systems',
  metaTitle: 'Custom Business Operating Systems & Enterprise Software',
  metaDescription:
  'Custom business platforms — CRM, finance, HR, inventory and operations in one system — for schools, hospitals, logistics, property, restaurants and manufacturers.',
  heroTitle: 'Software for how your business works.',
  heroCopy:
  'Custom operating systems for schools, hospitals, logistics, property, restaurants, manufacturing and more — CRM, finance, HR, inventory and operations in one platform.',
  problem: {
    title: 'A business run on a dozen disconnected tools.',
    body: 'Each department picks its own software. Data is re-entered, numbers disagree and leadership never sees the complete picture.',
    points: ['Duplicate data entry across departments', 'Reports that don’t reconcile', 'Processes that live in people’s heads']
  },
  solution: {
    title: 'One platform, one source of truth.',
    body: 'We build the central platform your operations run on — modular, integrated and shaped around your processes rather than a vendor’s template.',
    points: ['Modules for every department', 'Shared data, identity and permissions', 'Automation and AI built in']
  },
  capabilities: [
  { title: 'Industry platforms', body: 'School, hospital, logistics, property, restaurant and manufacturing systems.' },
  { title: 'Finance & payroll', body: 'Invoicing, expenses, payroll and financial reporting.' },
  { title: 'HR & people', body: 'Records, leave, onboarding and performance.' },
  { title: 'Inventory & CRM', body: 'Stock, suppliers, customers and pipelines in one place.' }],

  process: [
  { title: 'Operations audit', body: 'Every department’s workflows and data mapped.' },
  { title: 'Platform blueprint', body: 'Core data model, modules and integrations designed.' },
  { title: 'Module rollout', body: 'Delivered department by department to limit disruption.' },
  { title: 'Adoption & support', body: 'Training, feedback loops and continuous improvement.' }],

  technology: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'AI Agents'],
  security: ['Granular roles and permissions', 'Complete audit trails', 'Encrypted backups and tested recovery'],
  industries: ['education', 'healthcare', 'logistics', 'real-estate', 'hospitality', 'manufacturing']
},
{
  slug: 'software-modernization',
  pillar: 'operate',
  icon: 'refresh',
  title: 'Software Modernization',
  metaTitle: 'Legacy Software Modernization & Cloud Migration',
  metaDescription:
  'Captain.com modernizes legacy PHP, Java and .NET applications, old databases and APIs — migrating to modern, secure architecture without stopping the business.',
  heroTitle: 'Modernize the systems you can’t afford to lose.',
  heroCopy:
  'Legacy PHP, Java and .NET applications, old databases and APIs — migrated to modern architecture and cloud without stopping the business.',
  problem: {
    title: 'Critical systems no one wants to touch.',
    body: 'Legacy software often runs the most important processes, yet it is expensive to change, hard to secure and dependent on shrinking expertise.',
    points: ['Outdated frameworks and dependencies', 'Security gaps that are hard to patch', 'Slow, risky changes']
  },
  solution: {
    title: 'Incremental modernization, zero drama.',
    body: 'We map what exists, then replace it piece by piece — keeping the business running while architecture, security and performance improve.',
    points: ['Incremental, strangler-pattern migration', 'Verified data migration', 'Security modernized throughout']
  },
  capabilities: [
  { title: 'Application migration', body: 'Legacy PHP, Java and .NET moved to modern stacks.' },
  { title: 'Database modernization', body: 'Old schemas migrated with integrity checks.' },
  { title: 'Cloud migration', body: 'On-premise systems moved to managed cloud.' },
  { title: 'Architecture modernization', body: 'Monoliths decomposed where it genuinely helps.' }],

  process: [
  { title: 'System archaeology', body: 'Code, data and hidden dependencies documented.' },
  { title: 'Migration roadmap', body: 'Sequenced by risk and business value.' },
  { title: 'Incremental replacement', body: 'Old and new run side by side safely.' },
  { title: 'Decommission', body: 'Legacy retired only when fully replaced.' }],

  technology: ['PHP', 'Java', '.NET', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Azure'],
  security: ['Removal of unsupported dependencies', 'Modern authentication and encryption', 'Security testing before and after migration'],
  industries: ['government', 'manufacturing', 'fintech', 'education']
},
{
  slug: 'seo',
  pillar: 'grow',
  icon: 'search',
  title: 'SEO & Digital Performance',
  metaTitle: 'Technical SEO & Website Performance Optimization',
  metaDescription:
  'Technical SEO, performance engineering, structured data, analytics and content architecture for international search visibility — by Captain.com.',
  heroTitle: 'Be found. Load fast. Convert.',
  heroCopy:
  'Technical SEO, performance engineering, structured data, analytics and content architecture for international search visibility.',
  problem: {
    title: 'Great products no one can find.',
    body: 'Search engines reward fast, well-structured, crawlable sites. Many sites lose visibility to technical issues invisible to the people running them.',
    points: ['Pages missing from search indexes', 'Slow load times on mobile', 'No reliable measurement of what converts']
  },
  solution: {
    title: 'SEO engineered into the platform.',
    body: 'We treat search as an engineering discipline: crawlability, speed, structured data and content architecture — measured continuously.',
    points: ['Technical audits with engineering fixes', 'Structured data and international setup', 'Analytics and conversion tracking']
  },
  capabilities: [
  { title: 'Technical SEO', body: 'Crawlability, indexing, canonicalisation and international targeting.' },
  { title: 'Performance', body: 'Core Web Vitals improved at the code and infrastructure level.' },
  { title: 'Structured data', body: 'Schema markup that helps search engines understand you.' },
  { title: 'Conversion optimization', body: 'Measured improvements to the journeys that matter.' }],

  process: [
  { title: 'Audit', body: 'Technical, content and performance baseline.' },
  { title: 'Implement', body: 'Fixes shipped in code, not just recommended.' },
  { title: 'Content architecture', body: 'Structure that matches how people search.' },
  { title: 'Measure', body: 'Reporting on visibility, speed and conversion.' }],

  technology: ['Next.js', 'HTML', 'Structured data', 'Analytics', 'TypeScript'],
  security: ['HTTPS and secure headers as ranking foundations', 'Protection against spam and injected content', 'Monitoring for malicious redirects'],
  industries: ['ecommerce', 'professional-services', 'hospitality', 'startups']
},
{
  slug: 'digital-creative',
  pillar: 'grow',
  icon: 'clapperboard',
  title: 'Digital & Creative',
  metaTitle: 'Digital Branding, Video Editing & Motion Graphics',
  metaDescription:
  'Video editing, motion graphics, digital and social media branding, and content production by the Captain.com creative team.',
  heroTitle: 'Creative that carries the brand.',
  heroCopy:
  'Video editing, motion graphics, digital and social media branding, and content production — created by a team that understands the product.',
  problem: {
    title: 'Inconsistent brand, fragmented content.',
    body: 'Brands produced by many vendors lose coherence. Content becomes slow to produce and disconnected from the product it represents.',
    points: ['Inconsistent visual identity', 'Slow content production', 'Creative disconnected from the product']
  },
  solution: {
    title: 'One studio, one visual language.',
    body: 'We create brand systems and content that stay consistent across web, product, social and video.',
    points: ['Brand and social identity systems', 'Video and motion production', 'Reusable content templates']
  },
  capabilities: [
  { title: 'Video editing', body: 'Product, explainer and campaign video.' },
  { title: 'Motion graphics', body: 'Animated identities, interfaces and data stories.' },
  { title: 'Social media branding', body: 'Identity systems built for every platform.' },
  { title: 'Creative campaigns', body: 'Concept to production for launches and campaigns.' }],

  process: [
  { title: 'Brand & message', body: 'Audience, tone and visual principles defined.' },
  { title: 'Concept', body: 'Directions explored and one chosen together.' },
  { title: 'Production', body: 'Design, filming, editing and motion.' },
  { title: 'Distribute & iterate', body: 'Formats for every channel, refined by results.' }],

  technology: ['Motion design', 'Video production', 'Brand systems', 'Content workflows'],
  security: ['Controlled access to brand assets', 'Licensed, cleared media only', 'Secure review and approval workflows'],
  industries: ['hospitality', 'retail', 'startups', 'ecommerce']
}];