import type { CaseStudy } from '../types/content';

/**
 * PLACEHOLDER ENTRIES. These demonstrate the case-study format only.
 * They are not real Captain.com projects and contain no real clients or results.
 * Replace with published, client-approved case studies (isPlaceholder: false).
 */
export const caseStudies: CaseStudy[] = [
{
  id: 'placeholder-operations-platform',
  isPlaceholder: true,
  title: 'Operations platform',
  client: 'Client name — to be published',
  industry: 'Logistics (example)',
  challenge: 'Example format: the operational problem, the systems involved and why the existing approach no longer worked.',
  solution: 'Example format: the platform Captain.com designed — its modules, integrations and how teams use it day to day.',
  technology: ['React', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],
  security: 'Example format: access model, data protection and the testing performed before launch.',
  results: 'Results will be published only once verified with the client.',
  image: "/38bd20d9-193f-4734-b1b8-1fef78f81222.jpg",
  imageAlt: 'Bright, minimal warehouse interior with deep green shelving — illustrative image',
  architecture: ['Mobile app', 'API gateway', 'Operations core', 'Finance'],
  serviceSlugs: ['business-operating-systems', 'api-development', 'mobile-development', 'software-development']
},
{
  id: 'placeholder-patient-platform',
  isPlaceholder: true,
  title: 'Patient experience system',
  client: 'Client name — to be published',
  industry: 'Healthcare (example)',
  challenge: 'Example format: the service gap for patients and staff, and the constraints around sensitive data.',
  solution: 'Example format: the portal, scheduling and automation Captain.com delivered and how it connects to existing systems.',
  technology: ['Next.js', 'TypeScript', 'Python', 'PostgreSQL', 'Azure'],
  security: 'Example format: role-based access, audit trails and privacy controls applied.',
  results: 'Results will be published only once verified with the client.',
  image: "/f7803ba5-a6ef-4607-bce8-70f0fe6c5850.jpg",
  imageAlt: 'Clean clinical desk with a tablet showing an abstract green interface — illustrative image',
  architecture: ['Patient portal', 'Identity', 'Scheduling', 'Records'],
  serviceSlugs: ['web-development', 'ai-automation', 'business-operating-systems', 'cybersecurity']
},
{
  id: 'placeholder-security-programme',
  isPlaceholder: true,
  title: 'Security and cloud programme',
  client: 'Client name — to be published',
  industry: 'Fintech (example)',
  challenge: 'Example format: the security exposure, compliance context and infrastructure risks identified.',
  solution: 'Example format: the testing, remediation, cloud hardening and monitoring Captain.com put in place.',
  technology: ['AWS', 'Kubernetes', 'DevSecOps', 'API Security', 'Node.js'],
  security: 'Example format: penetration testing scope, remediation verified and ongoing monitoring coverage.',
  results: 'Results will be published only once verified with the client.',
  image: "/d467cb49-8222-45f2-9dce-6356063e7d17.jpg",
  imageAlt: 'Laptop on a white desk showing an abstract green data dashboard — illustrative image',
  architecture: ['Web app', 'API', 'Cloud', 'Monitoring'],
  serviceSlugs: ['cybersecurity', 'cloud-infrastructure', 'software-modernization', 'api-development', 'seo', 'digital-creative', 'embedded-systems', 'desktop-development']
}];