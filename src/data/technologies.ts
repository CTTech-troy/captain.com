import type { TechCategory } from '../types/content';

/** Technology options grouped by their role in a project architecture. */
export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: 'layout',
    description: 'Accessible websites and responsive product interfaces for audiences everywhere.',
    items: ['React', 'Next.js', 'Vue.js', 'Nuxt', 'Angular', 'Svelte', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS']
  },
  {
    id: 'backend',
    name: 'Backend & systems',
    icon: 'code',
    description: 'Business services, high-performance systems and dependable application logic.',
    items: ['C#', 'C++', 'Java', 'Python', 'Go', 'Rust', 'PHP', 'TypeScript', 'Node.js']
  },
  {
    id: 'frameworks',
    name: 'Backend frameworks',
    icon: 'server',
    description: 'Established foundations for enterprise applications, web services and APIs.',
    items: ['.NET', 'ASP.NET Core', 'Spring Boot', 'NestJS', 'Express', 'Django', 'FastAPI', 'Laravel']
  },
  {
    id: 'mobile',
    name: 'Mobile & desktop',
    icon: 'smartphone',
    description: 'Native and cross-platform experiences for iOS, Android, Windows, macOS and Linux.',
    items: ['React Native', 'Flutter', 'Swift', 'Kotlin', '.NET MAUI', 'Electron', 'Tauri', 'Qt']
  },
  {
    id: 'embedded',
    name: 'Embedded & IoT',
    icon: 'cpu',
    description: 'Connected devices, firmware and real-time software that work with physical systems.',
    items: ['C', 'C++', 'Rust', 'Embedded Linux', 'FreeRTOS', 'Zephyr', 'MQTT']
  },
  {
    id: 'infrastructure',
    name: 'Cloud & DevOps',
    icon: 'cloud',
    description: 'Repeatable deployments, resilient infrastructure and room to scale across regions.',
    items: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux']
  },
  {
    id: 'databases',
    name: 'Databases & search',
    icon: 'database',
    description: 'Transactional data, caching, document storage and search built around your workload.',
    items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'Redis', 'SQLite', 'Elasticsearch', 'pgvector']
  },
  {
    id: 'ai',
    name: 'AI & automation',
    icon: 'brain',
    description: 'Machine learning, retrieval and agent workflows connected to your business data.',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'LangChain', 'LlamaIndex', 'LLM APIs', 'RAG', 'AI agents']
  },
  {
    id: 'integration',
    name: 'APIs & messaging',
    icon: 'plug',
    description: 'Clear contracts and reliable communication between products, teams and systems.',
    items: ['REST', 'GraphQL', 'gRPC', 'OpenAPI', 'WebSockets', 'Apache Kafka', 'RabbitMQ']
  },
  {
    id: 'security',
    name: 'Security & reliability',
    icon: 'shield',
    description: 'Identity, security testing, automated quality checks and production observability.',
    items: ['OAuth 2.0', 'OpenID Connect', 'OWASP ZAP', 'Playwright', 'Vitest', 'k6', 'OpenTelemetry', 'Prometheus', 'Grafana']
  }
];
