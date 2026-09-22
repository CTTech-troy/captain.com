import type { Capability, Pillar } from '../types/content';

export const pillars: Pillar[] = [
{ id: 'engineer', label: 'Engineer', description: 'Software, platforms and devices.' },
{ id: 'intelligence', label: 'Intelligence', description: 'AI and business operating systems.' },
{ id: 'security', label: 'Security', description: 'Testing, protection and monitoring.' },
{ id: 'operate', label: 'Operate', description: 'Infrastructure and modernization.' },
{ id: 'grow', label: 'Grow', description: 'Search, brand and creative.' }];


export const capabilities: Capability[] = [
{
  id: 'software-engineering',
  number: '01',
  title: 'Software Engineering',
  pillar: 'engineer',
  summary: 'Custom software engineered around how your organisation actually operates.',
  items: ['Web applications', 'Enterprise applications', 'Backend systems', 'SaaS platforms', 'Database systems', 'Custom software'],
  icon: 'code',
  slug: 'software-development'
},
{
  id: 'ai-automation',
  number: '02',
  title: 'AI Automation',
  pillar: 'intelligence',
  summary: 'Agents and workflows that take repetitive work off your team.',
  items: ['AI agents', 'AI customer support', 'AI sales agents', 'AI voice agents', 'Document processing', 'AI reporting', 'Internal AI assistants', 'Workflow automation'],
  icon: 'bot',
  slug: 'ai-automation'
},
{
  id: 'cybersecurity',
  number: '03',
  title: 'Cybersecurity',
  pillar: 'security',
  summary: 'Offensive testing and defensive engineering across your entire stack.',
  items: ['Penetration testing', 'Web application security', 'API security', 'Cloud security', 'Vulnerability management', 'Secure code review', 'DevSecOps', 'Security monitoring'],
  icon: 'shield',
  slug: 'cybersecurity'
},
{
  id: 'cloud',
  number: '04',
  title: 'Cloud & Infrastructure',
  pillar: 'operate',
  summary: 'Resilient, observable infrastructure that scales with demand.',
  items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring', 'Backups', 'Disaster recovery', 'Cloud optimization'],
  icon: 'cloud',
  slug: 'cloud-infrastructure'
},
{
  id: 'business-os',
  number: '05',
  title: 'Business Operating Systems',
  pillar: 'intelligence',
  summary: 'One platform for the operations your business runs on.',
  items: ['School management', 'Hospital management', 'Logistics', 'Property management', 'Restaurant management', 'Manufacturing', 'HR', 'Payroll', 'Inventory', 'CRM', 'Financial systems'],
  icon: 'layout',
  slug: 'business-operating-systems'
},
{
  id: 'mobile',
  number: '06',
  title: 'Mobile Development',
  pillar: 'engineer',
  summary: 'Native and cross-platform apps with production-grade backends.',
  items: ['iOS', 'Android', 'Cross-platform applications', 'Mobile APIs', 'Authentication', 'Payments', 'Push notifications', 'Analytics'],
  icon: 'smartphone',
  slug: 'mobile-development'
},
{
  id: 'desktop',
  number: '07',
  title: 'Desktop Applications',
  pillar: 'engineer',
  summary: 'Reliable desktop software for teams that work offline and at scale.',
  items: ['Windows', 'macOS', 'Linux', 'Internal business software', 'Enterprise desktop applications', 'Offline-first systems'],
  icon: 'monitor',
  slug: 'desktop-development'
},
{
  id: 'embedded',
  number: '08',
  title: 'Embedded Systems',
  pillar: 'engineer',
  summary: 'Firmware and connected devices built for real-time reliability.',
  items: ['Firmware', 'IoT', 'Sensors', 'Hardware integrations', 'Device communication', 'Embedded security', 'Real-time systems'],
  icon: 'cpu',
  slug: 'embedded-systems'
},
{
  id: 'api',
  number: '09',
  title: 'API Development',
  pillar: 'engineer',
  summary: 'The integrations and interfaces that hold your systems together.',
  items: ['Payment APIs', 'Banking integrations', 'Logistics APIs', 'Identity verification', 'SMS', 'WhatsApp', 'Accounting', 'CRM', 'AI APIs', 'Enterprise integrations'],
  icon: 'plug',
  slug: 'api-development'
},
{
  id: 'modernization',
  number: '10',
  title: 'Software Modernization',
  pillar: 'operate',
  summary: 'Legacy systems migrated to modern architecture without stopping the business.',
  items: ['Legacy PHP', 'Java', '.NET', 'Old databases', 'Legacy APIs', 'Cloud migration', 'Architecture modernization', 'Security modernization'],
  icon: 'refresh',
  slug: 'software-modernization'
},
{
  id: 'seo',
  number: '11',
  title: 'SEO & Digital Performance',
  pillar: 'grow',
  summary: 'Search visibility and speed engineered into the platform.',
  items: ['Technical SEO', 'Search indexing', 'Performance', 'Structured data', 'Analytics', 'Content architecture', 'Conversion optimization'],
  icon: 'search',
  slug: 'seo'
},
{
  id: 'creative',
  number: '12',
  title: 'Digital & Creative',
  pillar: 'grow',
  summary: 'Brand, motion and content produced by a team that understands the product.',
  items: ['Video editing', 'Motion graphics', 'Social media branding', 'Digital branding', 'Creative campaigns', 'Content production'],
  icon: 'clapperboard',
  slug: 'digital-creative'
}];