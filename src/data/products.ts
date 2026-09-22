import type { ProductCategory } from '../types/content';

/** Future Captain.com product categories. No products are announced yet. */
export const productCategories: ProductCategory[] = [
{ id: 'ai-platforms', title: 'AI platforms', body: 'Platforms for deploying and supervising AI agents inside a business.', icon: 'bot' },
{ id: 'security-products', title: 'Cybersecurity products', body: 'Tools that make continuous security practical for growing teams.', icon: 'shield' },
{ id: 'business-os', title: 'Business operating systems', body: 'Configurable platforms for running core operations.', icon: 'layout' },
{ id: 'developer-tools', title: 'Developer tools', body: 'Utilities that make building and operating software faster.', icon: 'code' },
{ id: 'automation', title: 'Automation platforms', body: 'Workflow engines that connect systems and remove manual work.', icon: 'workflow' },
{ id: 'industry-saas', title: 'Industry-specific SaaS', body: 'Focused products for the industries we know best.', icon: 'layers' }];