import type { ServicePage } from '../types/content';

export const engineeringServicePages: ServicePage[] = [
{
  slug: 'software-development',
  pillar: 'engineer',
  icon: 'code',
  title: 'Software Development',
  metaTitle: 'Custom Software Development Company',
  metaDescription:
  'Ctrotech.com engineers custom web platforms, enterprise applications, SaaS products and backend systems built around how your business operates.',
  heroTitle: 'Custom software, engineered around how you operate.',
  heroCopy:
  'We design and build web platforms, enterprise applications and backend systems that fit your business — instead of forcing your business to fit the software.',
  problem: {
    title: 'When generic tools become the bottleneck.',
    body: 'Growing organisations outgrow spreadsheets and off-the-shelf tools. Workarounds pile up, data fragments and every new process costs more effort than the last.',
    points: ['Manual work filling the gaps between tools', 'Data scattered across disconnected systems', 'Software that cannot adapt to new processes']
  },
  solution: {
    title: 'Software that fits the business.',
    body: 'We model your operations first, then engineer a system around them — with clean architecture, tested code and an interface your team actually wants to use.',
    points: ['Domain-driven architecture', 'Maintainable, documented codebases', 'Built to integrate and extend']
  },
  capabilities: [
  { title: 'Enterprise applications', body: 'Internal platforms for operations, approvals, records and reporting.' },
  { title: 'Backend systems', body: 'APIs, services and data layers that other software depends on.' },
  { title: 'SaaS platforms', body: 'Multi-tenant products with billing, roles, onboarding and analytics.' },
  { title: 'Database systems', body: 'Data models designed for integrity, reporting and long-term growth.' }],

  process: [
  { title: 'Domain mapping', body: 'We document how work actually happens today — and where it breaks.' },
  { title: 'Architecture', body: 'Services, data and integration boundaries defined before code is written.' },
  { title: 'Iterative delivery', body: 'Working software in short, reviewable increments.' },
  { title: 'Handover & operation', body: 'Documentation, training and ongoing support after launch.' }],

  technology: ['TypeScript', 'React', 'Node.js', 'NestJS', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
  security: ['Secure coding standards and peer code review', 'Role-based access control from the first release', 'Dependency and vulnerability scanning in CI'],
  industries: ['fintech', 'professional-services', 'startups', 'logistics']
},
{
  slug: 'web-development',
  pillar: 'engineer',
  icon: 'globe',
  title: 'Web Development',
  metaTitle: 'Website Design & Web Application Development',
  metaDescription:
  'Fast, accessible, search-ready websites and web applications designed and engineered by Ctrotech.com for international businesses.',
  heroTitle: 'Websites and web applications built to perform.',
  heroCopy:
  'From company websites to complex web applications, we design and engineer fast, accessible and search-ready experiences for the web.',
  problem: {
    title: 'A slow, fragile website costs trust.',
    body: 'Visitors judge a company in seconds. Slow pages, broken layouts and content that only developers can change quietly undermine credibility and conversion.',
    points: ['Poor performance on mobile networks', 'Content updates that require engineering time', 'Weak search visibility and accessibility']
  },
  solution: {
    title: 'Fast, maintainable, built for growth.',
    body: 'We combine considered design with modern engineering: server-rendered pages, structured content and performance budgets from the very first commit.',
    points: ['Performance budgets and Core Web Vitals', 'Structured, CMS-ready content', 'Accessible by default']
  },
  capabilities: [
  { title: 'Website design', body: 'Brand-aligned interfaces designed for clarity and conversion.' },
  { title: 'Web applications', body: 'Dashboards, portals and tools that run anywhere in the browser.' },
  { title: 'CMS integration', body: 'Content teams publish without waiting for engineering tickets.' },
  { title: 'Performance engineering', body: 'Optimised assets, caching and rendering strategies.' }],

  process: [
  { title: 'Content & structure', body: 'Sitemap, messaging and information architecture first.' },
  { title: 'Design system', body: 'Reusable components that keep every page consistent.' },
  { title: 'Build & integrate', body: 'Engineering, CMS, analytics and forms wired together.' },
  { title: 'Launch & measure', body: 'Monitored launch with performance and search baselines.' }],

  technology: ['Next.js', 'React', 'TypeScript', 'HTML', 'CSS', 'Node.js'],
  security: ['HTTPS everywhere and hardened security headers', 'Protected forms with bot mitigation', 'Scheduled dependency updates'],
  industries: ['ecommerce', 'professional-services', 'hospitality', 'startups']
},
{
  slug: 'mobile-development',
  pillar: 'engineer',
  icon: 'smartphone',
  title: 'Mobile Development',
  metaTitle: 'iOS & Android App Development Company',
  metaDescription:
  'Native iOS and Android apps and cross-platform products, with the secure APIs, payments and analytics behind them — engineered by Ctrotech.com.',
  heroTitle: 'Mobile apps people rely on every day.',
  heroCopy:
  'Native iOS and Android apps and cross-platform products — with the APIs, authentication, payments and analytics that make them dependable.',
  problem: {
    title: 'Great apps fail on weak foundations.',
    body: 'An app is only as reliable as the platform behind it. Unstable APIs, poor offline handling and insecure authentication erode ratings and retention.',
    points: ['Crashes and slow performance', 'Fragile or insecure backends', 'Inconsistent experience across platforms']
  },
  solution: {
    title: 'Product-grade apps, end to end.',
    body: 'We build the app and the platform behind it together: secure APIs, identity, payments, notifications and analytics.',
    points: ['Native or cross-platform, chosen by need', 'Offline-aware architecture', 'Automated release pipelines and monitoring']
  },
  capabilities: [
  { title: 'iOS development', body: 'Swift apps that follow Apple platform conventions.' },
  { title: 'Android development', body: 'Kotlin apps built for the diversity of Android devices.' },
  { title: 'Cross-platform', body: 'React Native and Flutter when one codebase is the right fit.' },
  { title: 'Mobile backends', body: 'APIs, authentication, payments and push notifications.' }],

  process: [
  { title: 'Product definition', body: 'Core journeys, platforms and success measures agreed up front.' },
  { title: 'UX & prototyping', body: 'Tappable prototypes tested before engineering begins.' },
  { title: 'Build & device testing', body: 'Engineering validated on real devices and networks.' },
  { title: 'Store release', body: 'App Store and Google Play submission, then iteration.' }],

  technology: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'TypeScript', 'Node.js', 'PostgreSQL'],
  security: ['Secure token storage and biometric authentication', 'Certificate pinning and encrypted transport', 'Mobile application security testing'],
  industries: ['logistics', 'healthcare', 'real-estate', 'startups']
},
{
  slug: 'desktop-development',
  pillar: 'engineer',
  icon: 'monitor',
  title: 'Desktop Development',
  metaTitle: 'Desktop Application Development — Windows, macOS, Linux',
  metaDescription:
  'Ctrotech.com builds Windows, macOS and Linux desktop applications with offline-first data, hardware integration and secure cloud sync.',
  heroTitle: 'Desktop software for serious work.',
  heroCopy:
  'Windows, macOS and Linux applications for teams that need performance, offline capability and deep integration with local hardware and files.',
  problem: {
    title: 'Some work doesn’t belong in a browser tab.',
    body: 'Heavy data processing, hardware access and unreliable connectivity demand software that runs locally — yet many desktop tools are aging and hard to maintain.',
    points: ['Legacy desktop tools no one can update', 'Work stops when the network drops', 'Poor integration with modern systems']
  },
  solution: {
    title: 'Modern desktop, connected to the cloud.',
    body: 'We build desktop applications with modern frameworks, offline-first data and secure synchronisation with your central systems.',
    points: ['Cross-platform where possible', 'Offline-first with reliable sync', 'Signed, auto-updating releases']
  },
  capabilities: [
  { title: 'Windows applications', body: 'Internal and enterprise software for Windows fleets.' },
  { title: 'macOS applications', body: 'Native-feeling tools for creative and technical teams.' },
  { title: 'Linux applications', body: 'Software for workstations, kiosks and industrial terminals.' },
  { title: 'Offline-first systems', body: 'Local data that syncs safely when connectivity returns.' }],

  process: [
  { title: 'Workflow study', body: 'How people, files and hardware interact today.' },
  { title: 'Sync model', body: 'Conflict handling and data ownership defined early.' },
  { title: 'Build & integrate', body: 'Hardware, file system and cloud integration.' },
  { title: 'Distribution', body: 'Signed installers, auto-updates and fleet rollout.' }],

  technology: ['TypeScript', 'React', 'Node.js', 'Python', 'Java', 'PostgreSQL'],
  security: ['Code signing and secure update channels', 'Encryption of locally stored data', 'Least-privilege system access'],
  industries: ['manufacturing', 'healthcare', 'government', 'professional-services']
},
{
  slug: 'embedded-systems',
  pillar: 'engineer',
  icon: 'cpu',
  title: 'Embedded Systems',
  metaTitle: 'Embedded Systems, Firmware & IoT Development',
  metaDescription:
  'Firmware, IoT platforms and hardware integrations engineered by Ctrotech.com for real-time reliability and device security.',
  heroTitle: 'Firmware and connected devices, engineered for the real world.',
  heroCopy:
  'Embedded software, IoT platforms and hardware integrations that operate reliably in real time — and securely at scale.',
  problem: {
    title: 'Hardware projects fail at the seams.',
    body: 'Devices, firmware, connectivity and cloud are often built by separate teams. The result is unreliable communication, insecure devices and data that never reaches the business.',
    points: ['Unreliable device communication', 'Devices shipped without security', 'Sensor data trapped on the device']
  },
  solution: {
    title: 'One team from sensor to dashboard.',
    body: 'We engineer the firmware, the communication layer and the cloud platform together, so data flows reliably from device to decision.',
    points: ['Real-time, resource-aware firmware', 'Secure provisioning and updates', 'Cloud ingestion and fleet monitoring']
  },
  capabilities: [
  { title: 'Firmware development', body: 'Deterministic, resource-aware software for microcontrollers.' },
  { title: 'IoT platforms', body: 'Device fleets, telemetry pipelines and remote management.' },
  { title: 'Hardware integration', body: 'Sensors, controllers and legacy equipment connected safely.' },
  { title: 'Embedded security', body: 'Device identity, secure boot and encrypted communication.' }],

  process: [
  { title: 'Constraints review', body: 'Power, memory, connectivity and environment understood.' },
  { title: 'Firmware architecture', body: 'Real-time behaviour and update strategy designed.' },
  { title: 'Field testing', body: 'Validation on real hardware in real conditions.' },
  { title: 'Fleet operation', body: 'Monitoring and over-the-air updates in production.' }],

  technology: ['C / C++', 'Python', 'MQTT', 'AWS', 'Docker', 'PostgreSQL'],
  security: ['Secure boot and signed firmware', 'Device identity and encrypted communication', 'Integrity checks on over-the-air updates'],
  industries: ['manufacturing', 'logistics', 'healthcare']
},
{
  slug: 'api-development',
  pillar: 'engineer',
  icon: 'plug',
  title: 'API Development',
  metaTitle: 'API Development & Integration Services',
  metaDescription:
  'Payment, banking, logistics, identity, messaging, accounting and AI integrations — plus the APIs your products expose — built by Ctrotech.com.',
  heroTitle: 'APIs and integrations that hold systems together.',
  heroCopy:
  'Payment, banking, logistics, identity, messaging, accounting and AI integrations — and the APIs your own products expose to the world.',
  problem: {
    title: 'Integrations are where systems break.',
    body: 'Poorly built integrations fail silently, duplicate data and expose sensitive endpoints. Every new partner becomes another custom project.',
    points: ['Brittle point-to-point integrations', 'Undocumented, inconsistent APIs', 'Exposed or unauthenticated endpoints']
  },
  solution: {
    title: 'Designed, documented, observable.',
    body: 'We design APIs contract-first, build resilient integrations with retries and monitoring, and document everything your partners need.',
    points: ['Contract-first API design', 'Resilient, idempotent integrations', 'Monitoring and alerting on every connection']
  },
  capabilities: [
  { title: 'Payments & banking', body: 'Payment gateways, banking and wallet integrations.' },
  { title: 'Identity verification', body: 'KYC, document checks and authentication providers.' },
  { title: 'Messaging', body: 'SMS, WhatsApp and email delivered reliably at scale.' },
  { title: 'Enterprise integrations', body: 'CRM, accounting, ERP and AI APIs connected cleanly.' }],

  process: [
  { title: 'Integration inventory', body: 'Every system, data flow and owner mapped.' },
  { title: 'Contract design', body: 'Schemas, versioning and error handling agreed.' },
  { title: 'Build & test', body: 'Automated contract and failure-mode testing.' },
  { title: 'Monitor & version', body: 'Observability and safe evolution over time.' }],

  technology: ['Node.js', 'NestJS', 'Python', 'TypeScript', 'PostgreSQL', 'Redis', 'LLM APIs'],
  security: ['OAuth 2.0 and scoped API keys', 'Rate limiting and strict input validation', 'Dedicated API security testing'],
  industries: ['fintech', 'logistics', 'ecommerce', 'professional-services']
}];