/**
 * Content types. Every content collection on the site is typed here so a
 * future CMS / admin dashboard can map records 1:1 onto these shapes.
 */

export type IconKey =
'code' |
'globe' |
'bot' |
'shield' |
'cloud' |
'layout' |
'smartphone' |
'monitor' |
'cpu' |
'plug' |
'refresh' |
'search' |
'clapperboard' |
'database' |
'users' |
'file' |
'brain' |
'gauge' |
'zap' |
'mail' |
'headset' |
'briefcase' |
'wallet' |
'package' |
'settings' |
'message' |
'lock' |
'server' |
'workflow' |
'sparkles' |
'activity' |
'target' |
'scan' |
'trending' |
'layers' |
'rocket' |
'wrench' |
'lightbulb' |
'pen' |
'branch' |
'compass';

export type PillarId = 'engineer' | 'intelligence' | 'security' | 'operate' | 'grow';

export interface Pillar {
  id: PillarId;
  label: string;
  description: string;
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  pillar: PillarId;
  summary: string;
  items: string[];
  icon: IconKey;
  slug: string;
}

export interface TitledText {
  title: string;
  body: string;
}

export interface ServicePage {
  slug: string;
  pillar: PillarId;
  icon: IconKey;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroCopy: string;
  problem: {title: string;body: string;points: string[];};
  solution: {title: string;body: string;points: string[];};
  capabilities: TitledText[];
  process: TitledText[];
  technology: string[];
  security: string[];
  industries: string[];
}

export interface Industry {
  id: string;
  name: string;
  summary: string;
  services: string[];
  systems: string[];
  technology: string[];
  security: string[];
  automation: string[];
}

export interface CaseStudy {
  id: string;
  isPlaceholder: boolean;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  technology: string[];
  security: string;
  results: string;
  image: string;
  imageAlt: string;
  architecture: string[];
  serviceSlugs: string[];
}

export interface ProcessStage {
  id: string;
  number: string;
  title: string;
  body: string;
  icon: IconKey;
}

export interface Principle {
  id: string;
  title: string;
  body: string;
  points: string[];
  icon: IconKey;
}

export interface TechCategory {
  id: string;
  name: string;
  description: string;
  items: string[];
}

export interface ProductCategory {
  id: string;
  title: string;
  body: string;
  icon: IconKey;
}

export interface SceneNode {
  id: string;
  label: string;
  icon: IconKey;
  detail?: string;
}

export interface SecurityLayer {
  id: string;
  label: string;
  icon: IconKey;
  control: string;
}

export interface NavLink {
  label: string;
  to: string;
  sectionId?: string;
}

export interface LinkItem {
  label: string;
  to: string;
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

export interface AboutChapter {
  id: string;
  label: string;
  title: string;
  body: string[];
  points?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface LegalDocument {
  slug: string;
  title: string;
  summary: string;
}