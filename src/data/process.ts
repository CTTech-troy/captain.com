import type { Principle, ProcessStage, SceneNode } from '../types/content';

export const processStages: ProcessStage[] = [
{ id: 'discover', number: '01', title: 'Discover', body: 'Understand the business and objectives.', icon: 'compass' },
{ id: 'architect', number: '02', title: 'Architect', body: 'Define the technical architecture and security model.', icon: 'layers' },
{ id: 'design', number: '03', title: 'Design', body: 'Create the product experience.', icon: 'pen' },
{ id: 'engineer', number: '04', title: 'Engineer', body: 'Build the software and integrations.', icon: 'code' },
{ id: 'secure', number: '05', title: 'Secure', body: 'Test applications, APIs and infrastructure.', icon: 'shield' },
{ id: 'deploy', number: '06', title: 'Deploy', body: 'Launch into production.', icon: 'rocket' },
{ id: 'operate', number: '07', title: 'Operate', body: 'Monitor, maintain and improve.', icon: 'activity' }];


export const principles: Principle[] = [
{
  id: 'innovate',
  title: 'Innovate',
  body: 'We look for the technology that genuinely changes how the business works — not novelty for its own sake.',
  points: ['Product thinking before code', 'Prototypes that test the idea early', 'Modern, proven technology choices'],
  icon: 'lightbulb'
},
{
  id: 'automate',
  title: 'Automate',
  body: 'Every repetitive task is a candidate for software. We automate the work that slows skilled people down.',
  points: ['AI agents and workflow automation', 'Integrations instead of re-entry', 'Automated testing and delivery'],
  icon: 'workflow'
},
{
  id: 'secure',
  title: 'Secure',
  body: 'Security is designed in from the architecture stage, tested before launch and monitored afterwards.',
  points: ['Threat modelling at design time', 'Penetration testing before release', 'Continuous monitoring'],
  icon: 'shield'
},
{
  id: 'scale',
  title: 'Scale',
  body: 'Systems are engineered for the business you are becoming, with infrastructure that grows with demand.',
  points: ['Cloud-native architecture', 'Observability from day one', 'Performance budgets'],
  icon: 'trending'
}];


export const managedLoop: SceneNode[] = [
{ id: 'build', label: 'Build', icon: 'code' },
{ id: 'deploy', label: 'Deploy', icon: 'rocket' },
{ id: 'secure', label: 'Secure', icon: 'shield' },
{ id: 'monitor', label: 'Monitor', icon: 'activity' },
{ id: 'improve', label: 'Improve', icon: 'trending' }];


export const managedServices: string[] = [
'Software maintenance',
'Security monitoring',
'Infrastructure monitoring',
'Performance optimization',
'Cloud management',
'Vulnerability management',
'Technical support',
'Continuous development'];