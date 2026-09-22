import type { Industry } from '../types/content';

export const industries: Industry[] = [
{
  id: 'fintech',
  name: 'Fintech',
  summary: 'Financial products where correctness, auditability and security are non-negotiable.',
  services: ['software-development', 'api-development', 'cybersecurity', 'cloud-infrastructure'],
  systems: ['Customer onboarding and KYC flows', 'Payment and wallet platforms', 'Internal risk and back-office tools'],
  technology: ['Idempotent, auditable transaction APIs', 'Banking and payment provider integrations', 'High-availability cloud architecture'],
  security: ['Strong customer authentication', 'Encryption of financial data in transit and at rest', 'Regular penetration testing of payment flows'],
  automation: ['Document verification workflows', 'Reconciliation and reporting', 'Customer support triage']
},
{
  id: 'healthcare',
  name: 'Healthcare',
  summary: 'Clinical and administrative software that handles sensitive patient information.',
  services: ['business-operating-systems', 'software-development', 'cybersecurity', 'ai-automation'],
  systems: ['Patient management and scheduling', 'Hospital operations platforms', 'Patient-facing mobile apps'],
  technology: ['Role-based access across clinical teams', 'Integration with existing clinical systems', 'Reliable, offline-capable interfaces'],
  security: ['Strict access control and audit trails', 'Protection of personal health data', 'Data residency aligned with local regulation'],
  automation: ['Appointment reminders and intake', 'Document and form processing', 'Operational reporting']
},
{
  id: 'education',
  name: 'Education',
  summary: 'Platforms that run schools and learning — for staff, students and families.',
  services: ['business-operating-systems', 'web-development', 'mobile-development', 'cloud-infrastructure'],
  systems: ['School management systems', 'Learning and course platforms', 'Parent and student portals'],
  technology: ['Infrastructure that handles enrolment peaks', 'Multi-role portals', 'Payment and messaging integrations'],
  security: ['Protection of minors’ data', 'Role-based permissions for staff', 'Secure authentication for families'],
  automation: ['Admissions processing', 'Fee reminders and invoicing', 'Attendance and performance reporting']
},
{
  id: 'logistics',
  name: 'Logistics',
  summary: 'Systems that move goods, vehicles and information in real time.',
  services: ['business-operating-systems', 'api-development', 'mobile-development', 'embedded-systems'],
  systems: ['Fleet and dispatch platforms', 'Warehouse and inventory systems', 'Driver mobile apps'],
  technology: ['Carrier and tracking API integrations', 'Real-time location data', 'Offline-first mobile workflows'],
  security: ['Device and API authentication', 'Access control across partners', 'Monitoring of integration endpoints'],
  automation: ['Dispatch and route updates', 'Proof-of-delivery processing', 'Exception alerts and customer notifications']
},
{
  id: 'ecommerce',
  name: 'E-commerce',
  summary: 'Commerce platforms that need to be fast, findable and always available.',
  services: ['web-development', 'seo', 'api-development', 'ai-automation'],
  systems: ['Storefronts and checkout', 'Order and inventory management', 'Customer accounts and loyalty'],
  technology: ['Fast, indexable storefront pages', 'Payment and shipping integrations', 'Traffic-ready infrastructure'],
  security: ['Secure checkout and payment handling', 'Account takeover protection', 'Bot and abuse mitigation'],
  automation: ['Order routing and fulfilment updates', 'AI customer support', 'Catalogue and content updates']
},
{
  id: 'real-estate',
  name: 'Real Estate',
  summary: 'Software for listings, leasing, tenants and property operations.',
  services: ['business-operating-systems', 'web-development', 'mobile-development', 'ai-automation'],
  systems: ['Property management platforms', 'Listing and lead portals', 'Tenant and owner apps'],
  technology: ['Listing search and maps', 'Payment and accounting integrations', 'Document management'],
  security: ['Protection of tenant and financial records', 'Secure document sharing', 'Access control for agents and owners'],
  automation: ['Lead qualification', 'Lease and document processing', 'Maintenance request routing']
},
{
  id: 'manufacturing',
  name: 'Manufacturing',
  summary: 'Connecting machines, production and the business systems around them.',
  services: ['embedded-systems', 'business-operating-systems', 'software-modernization', 'cloud-infrastructure'],
  systems: ['Production and inventory systems', 'Machine and sensor monitoring', 'Quality and maintenance tracking'],
  technology: ['Device and sensor integration', 'Real-time data pipelines', 'Integration with legacy plant systems'],
  security: ['Segmentation of operational networks', 'Firmware and device security', 'Controlled remote access'],
  automation: ['Maintenance alerts from sensor data', 'Stock replenishment triggers', 'Production reporting']
},
{
  id: 'hospitality',
  name: 'Hospitality',
  summary: 'Guest-facing and back-of-house software for hotels, restaurants and venues.',
  services: ['business-operating-systems', 'web-development', 'mobile-development', 'digital-creative'],
  systems: ['Reservation and booking engines', 'Restaurant and venue management', 'Guest apps and loyalty'],
  technology: ['Channel and payment integrations', 'Point-of-sale connectivity', 'Multi-location operations'],
  security: ['Payment card data protection', 'Guest data privacy', 'Staff access management'],
  automation: ['Booking confirmations and follow-up', 'Inventory and ordering', 'Review and feedback handling']
},
{
  id: 'retail',
  name: 'Retail',
  summary: 'Unified systems for stores, stock and customers across every channel.',
  services: ['business-operating-systems', 'web-development', 'api-development', 'seo'],
  systems: ['Inventory and point-of-sale platforms', 'Omnichannel commerce', 'Loyalty and CRM'],
  technology: ['Store and online inventory sync', 'POS and payment integrations', 'Analytics and reporting pipelines'],
  security: ['Payment and customer data protection', 'Store device security', 'Supplier integration security'],
  automation: ['Reordering and stock alerts', 'Customer messaging', 'Sales reporting']
},
{
  id: 'government',
  name: 'Government',
  summary: 'Public services that must be accessible, secure and built to last.',
  services: ['software-modernization', 'cybersecurity', 'web-development', 'cloud-infrastructure'],
  systems: ['Citizen service portals', 'Case and records management', 'Internal administrative systems'],
  technology: ['Accessible, multilingual interfaces', 'Integration with existing registries', 'Modernization of legacy systems'],
  security: ['Security reviews and penetration testing', 'Strict identity and access management', 'Audit logging and data governance'],
  automation: ['Application and form processing', 'Case routing', 'Public reporting']
},
{
  id: 'professional-services',
  name: 'Professional Services',
  summary: 'Client work, documents and billing brought into one secure system.',
  services: ['business-operating-systems', 'ai-automation', 'web-development', 'api-development'],
  systems: ['Client portals', 'Practice and project management', 'Billing and time tracking'],
  technology: ['CRM and accounting integrations', 'Document management', 'Secure client collaboration'],
  security: ['Confidential client data protection', 'Access control per client and matter', 'Secure file exchange'],
  automation: ['Document drafting and review', 'Client intake', 'Invoicing and reporting']
},
{
  id: 'startups',
  name: 'Startups',
  summary: 'Products that need to launch fast without building on sand.',
  services: ['software-development', 'mobile-development', 'cloud-infrastructure', 'ai-automation'],
  systems: ['Minimum viable products', 'SaaS platforms', 'Investor-ready product infrastructure'],
  technology: ['Architecture that scales past launch', 'Fast iteration with CI/CD', 'Cost-aware cloud setup'],
  security: ['Secure-by-default foundations', 'Authentication and authorization done right', 'Security review before launch'],
  automation: ['Onboarding and lifecycle messaging', 'Internal operations', 'Support and reporting']
}];