import type { ServicePage } from '../types/content';
import { engineeringServicePages } from './servicePagesEngineering';
import { platformServicePages } from './servicePagesPlatform';

/** All indexable service pages (/services/:slug). */
export const servicePages: ServicePage[] = [...engineeringServicePages, ...platformServicePages];