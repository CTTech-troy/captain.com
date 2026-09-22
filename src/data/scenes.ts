import type { SceneNode, SecurityLayer } from '../types/content';

export const heroChips: SceneNode[] = [
{ id: 'agents', label: 'AI Agents', icon: 'bot' },
{ id: 'security', label: 'Security Monitoring', icon: 'shield' },
{ id: 'analytics', label: 'Real-time Analytics', icon: 'activity' },
{ id: 'infrastructure', label: 'Secure Infrastructure', icon: 'server' },
{ id: 'workflows', label: 'Automated Workflows', icon: 'workflow' },
{ id: 'intelligence', label: 'Business Intelligence', icon: 'gauge' }];


export const ecosystemNodes: SceneNode[] = [
{ id: 'data', label: 'Data', icon: 'database' },
{ id: 'applications', label: 'Applications', icon: 'layout' },
{ id: 'ai', label: 'AI', icon: 'brain' },
{ id: 'security', label: 'Security', icon: 'shield' },
{ id: 'infrastructure', label: 'Infrastructure', icon: 'server' },
{ id: 'business', label: 'Business', icon: 'briefcase' }];


export const introSatellites: SceneNode[] = [
{ id: 'apis', label: 'APIs', icon: 'plug' },
{ id: 'databases', label: 'Databases', icon: 'database' },
{ id: 'cloud', label: 'Cloud', icon: 'cloud' },
{ id: 'ai', label: 'AI', icon: 'brain' },
{ id: 'security', label: 'Security', icon: 'shield' },
{ id: 'users', label: 'Users', icon: 'users' }];


export const aiStages: SceneNode[] = [
{ id: 'document', label: 'Document', icon: 'file', detail: 'A supplier invoice arrives by email.' },
{ id: 'model', label: 'AI Model', icon: 'brain', detail: 'The model reads and understands it.' },
{ id: 'analysis', label: 'Analysis', icon: 'scan', detail: 'Fields are extracted and validated.' },
{ id: 'decision', label: 'Decision', icon: 'branch', detail: 'Business rules and approvals apply.' },
{ id: 'automation', label: 'Automation', icon: 'workflow', detail: 'Systems update, teams are notified.' },
{ id: 'result', label: 'Business Result', icon: 'trending', detail: 'Processed with no manual entry.' }];


export const aiIntegrations: SceneNode[] = [
{ id: 'crm', label: 'CRM', icon: 'target' },
{ id: 'email', label: 'Email', icon: 'mail' },
{ id: 'documents', label: 'Documents', icon: 'file' },
{ id: 'databases', label: 'Databases', icon: 'database' },
{ id: 'apis', label: 'APIs', icon: 'plug' },
{ id: 'support', label: 'Customer Support', icon: 'headset' },
{ id: 'reporting', label: 'Reporting', icon: 'gauge' },
{ id: 'operations', label: 'Business Operations', icon: 'briefcase' }];


export const securityLayers: SecurityLayer[] = [
{ id: 'application', label: 'Application', icon: 'layout', control: 'Secure code review · SAST' },
{ id: 'api', label: 'API', icon: 'plug', control: 'Authentication · Rate limiting' },
{ id: 'database', label: 'Database', icon: 'database', control: 'Encryption · Access policies' },
{ id: 'cloud', label: 'Cloud', icon: 'cloud', control: 'IAM · Network segmentation' },
{ id: 'user', label: 'User', icon: 'users', control: 'MFA · Session protection' }];


export const securityStates: {id: string;label: string;body: string;event: string;}[] = [
{
  id: 'unprotected',
  label: 'Unprotected',
  body: 'A system as many are shipped: working, but untested and unwatched.',
  event: 'Attack surface mapped across five layers.'
},
{
  id: 'tested',
  label: 'Tested',
  body: 'Penetration testing and code review expose weaknesses layer by layer.',
  event: 'Penetration test: API authentication flow reviewed.'
},
{
  id: 'secured',
  label: 'Secured',
  body: 'Findings are remediated and controls enforced in code and configuration.',
  event: 'Control applied: encryption enforced across services.'
},
{
  id: 'monitored',
  label: 'Monitored',
  body: 'Continuous monitoring and vulnerability management keep it that way.',
  event: 'Monitoring active: unusual sign-in pattern flagged for review.'
}];


export const businessModules: SceneNode[] = [
{ id: 'crm', label: 'CRM', icon: 'target' },
{ id: 'finance', label: 'Finance', icon: 'wallet' },
{ id: 'hr', label: 'HR', icon: 'users' },
{ id: 'inventory', label: 'Inventory', icon: 'package' },
{ id: 'operations', label: 'Operations', icon: 'settings' },
{ id: 'customers', label: 'Customers', icon: 'globe' },
{ id: 'ai', label: 'AI', icon: 'bot' },
{ id: 'reporting', label: 'Reporting', icon: 'gauge' },
{ id: 'communication', label: 'Communication', icon: 'message' }];


export const businessPhases: {label: string;title: string;body: string;}[] = [
{
  label: 'An application',
  title: 'Separate tools, separate truths.',
  body: 'Most businesses run on disconnected tools. Data is re-entered, reports disagree and no one sees the whole operation.'
},
{
  label: 'Connecting',
  title: 'One platform layer beneath everything.',
  body: 'We engineer shared data, identity and workflows — then connect every system to it, one by one.'
},
{
  label: 'Infrastructure',
  title: 'One connected business ecosystem.',
  body: 'Every team, report and AI agent now works from a single source of truth. That is the software infrastructure of a business.'
}];