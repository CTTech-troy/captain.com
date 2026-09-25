import { next } from '@vercel/functions';
import { canonicalRedirect } from './src/utils/urlNormalization.ts';

export default function middleware(request: Request) {
  if (request.method === 'GET' || request.method === 'HEAD') {
    const target = canonicalRedirect(request.url);
    if (target) return Response.redirect(target, 308);
  }
  return next({ headers: process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
    ? { 'X-Robots-Tag': 'noindex, nofollow' } : {} });
}
export const config = { matcher: '/((?!api/|assets/|images/).*)' };
