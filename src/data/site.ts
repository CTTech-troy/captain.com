import type { FooterColumn, LegalDocument, LinkItem, NavLink } from '../types/content';

export const brand = {
  name: 'Captain.com',
  primaryMessage: 'We build the software businesses depend on.',
  secondaryMessage: 'Software. Security. Intelligence.',
  heroCopy:
  'Captain.com designs, builds, secures and operates software systems for companies that need technology to perform, scale and stay ahead.'
};

export const navLinks: NavLink[] = [
{ label: 'Services', to: '/services', sectionId: 'capabilities' },
{ label: 'Industries', to: '/#industries', sectionId: 'industries' },
{ label: 'Case Studies', to: '/#case-studies', sectionId: 'case-studies' },
{ label: 'Technology', to: '/#technology', sectionId: 'technology' },
{ label: 'About', to: '/about' },
{ label: 'Insights', to: '/insights' },
{ label: 'Contact', to: '/contact' }];


export const heroAssurances: string[] = ['Global clients', 'Secure by design', 'Built for scale'];

export const footerColumns: FooterColumn[] = [
{
  title: 'Company',
  links: [
  { label: 'About', to: '/about' },
  { label: 'Capabilities', to: '/services' },
  { label: 'Industries', to: '/#industries' },
  { label: 'Case Studies', to: '/#case-studies' },
  { label: 'Careers', to: '/about#careers' },
  { label: 'Contact', to: '/contact' }]

},
{
  title: 'Services',
  links: [
  { label: 'Software Development', to: '/services/software-development' },
  { label: 'AI Automation', to: '/services/ai-automation' },
  { label: 'Cybersecurity', to: '/services/cybersecurity' },
  { label: 'Cloud Infrastructure', to: '/services/cloud-infrastructure' },
  { label: 'Business Systems', to: '/services/business-operating-systems' },
  { label: 'Mobile Development', to: '/services/mobile-development' },
  { label: 'API Development', to: '/services/api-development' },
  { label: 'SEO', to: '/services/seo' }]

},
{
  title: 'Resources',
  links: [
  { label: 'Insights', to: '/insights' },
  { label: 'Technology', to: '/#technology' },
  { label: 'Security', to: '/services/cybersecurity' },
  { label: 'Case Studies', to: '/#case-studies' }]

},
{
  title: 'Legal',
  links: [
  { label: 'Privacy', to: '/legal/privacy' },
  { label: 'Terms', to: '/legal/terms' },
  { label: 'Security', to: '/legal/security' }]

}];


/** Placeholder profile URLs — replace with the official Captain.com profiles. */
export const socialLinks: LinkItem[] = [
{ label: 'LinkedIn', to: 'https://www.linkedin.com/', external: true },
{ label: 'X', to: 'https://x.com/', external: true },
{ label: 'Instagram', to: 'https://www.instagram.com/', external: true },
{ label: 'YouTube', to: 'https://www.youtube.com/', external: true },
{ label: 'GitHub', to: 'https://github.com/', external: true }];


export const legalDocuments: LegalDocument[] = [
{
  slug: 'privacy',
  title: 'Privacy Policy',
  summary: 'How Captain.com collects, uses and protects personal information submitted through this website.'
},
{
  slug: 'terms',
  title: 'Terms of Use',
  summary: 'The terms that govern the use of the Captain.com website and its content.'
},
{
  slug: 'security',
  title: 'Security',
  summary: 'How Captain.com approaches the security of its website, and how to report a vulnerability responsibly.'
}];