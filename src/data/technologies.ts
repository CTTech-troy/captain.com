import type { TechCategory } from '../types/content';

/** Only technologies Captain.com actively uses in delivery. Edit as the stack evolves. */
export const techCategories: TechCategory[] = [
{
  id: 'frontend',
  name: 'Frontend',
  description: 'Interfaces that are fast, accessible and maintainable.',
  items: ['React', 'Next.js', 'TypeScript', 'HTML', 'CSS']
},
{
  id: 'backend',
  name: 'Backend',
  description: 'Services and APIs that carry business logic reliably.',
  items: ['Node.js', 'NestJS', 'Python', 'PHP', 'Java']
},
{
  id: 'mobile',
  name: 'Mobile',
  description: 'Native and cross-platform apps for iOS and Android.',
  items: ['React Native', 'Flutter', 'Swift', 'Kotlin']
},
{
  id: 'infrastructure',
  name: 'Infrastructure',
  description: 'Cloud platforms and containers that scale and recover.',
  items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes']
},
{
  id: 'databases',
  name: 'Databases',
  description: 'Data stores chosen for integrity, speed and scale.',
  items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB']
},
{
  id: 'ai',
  name: 'AI',
  description: 'Models and agents grounded in your own data.',
  items: ['LLM APIs', 'AI Agents', 'RAG', 'Machine Learning', 'Automation']
},
{
  id: 'security',
  name: 'Security',
  description: 'Practices embedded across every layer of the stack.',
  items: ['Application Security', 'API Security', 'Cloud Security', 'DevSecOps', 'Penetration Testing']
}];