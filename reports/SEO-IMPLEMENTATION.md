# Ctrotech SEO implementation

Production target: https://ctrotech.com on Vercel. Changes are local; this report
does not claim a production deployment or Google indexing.

## Audit and implementation

The project uses React 19, Vite 8, TypeScript, Tailwind 4, React Router 7 and
Framer Motion. Previously the initial document was an empty app shell; metadata
was client-only, the default sharing image was missing, and a catch-all deployment
rewrite would serve missing pages as HTTP 200.

The build now produces 22 complete HTML documents: 21 existing public routes plus
the custom 404. The sitemap contains 17 indexable canonical pages. Insights is
empty and the three legal documents are unfinished, so these four routes remain
accessible but have noindex and are excluded from the sitemap. No articles,
testimonials, addresses, social identities or search functionality were invented.
Existing example case studies are explicitly labeled as placeholders.

Each indexable page has a unique title and description, production canonical,
Open Graph and Twitter metadata. Sharing images use existing project assets with
verified dimensions and alt text; pages without a distinct relevant image reuse
the existing Ctrotech hero rather than fabricating imagery. This is a deliberate
exception to having a different social image on every page.

JSON-LD includes Organization, WebSite, WebPage (AboutPage/ContactPage where
appropriate), Service, BreadcrumbList and ImageObject. It uses the real support
email and existing content. There is no Article or SearchAction schema because
there are no published articles or internal search. Generic social homepage links
were removed rather than presented as verified company profiles.

Canonical URLs use HTTPS, non-www and no trailing slash. Page middleware normalizes
case and HTML/index aliases and retains visitor query parameters while metadata
uses the clean canonical. Asset/API path casing is preserved. Vercel cleanUrls
serves generated HTML; the SPA catch-all was removed for actual missing-page 404s.
Nonproduction middleware responses receive an X-Robots-Tag noindex header.

Robots allows public pages, CSS, JS and images and disallows /api/. The generated
sitemap includes canonical pages and image URLs, without invented lastmod dates.
Header/footer, service navigation, breadcrumbs and related-service links form a
connected hierarchy. The hero now links directly to the service index. Generated
HTML links and fragments are checked for broken targets and orphan pages.

## Images and performance

The five used raster images now have descriptive hashed WebP filenames,
responsive srcsets/sizes, actual intrinsic dimensions and accurate alt text.
Above-the-fold hero/About images load eagerly with high priority; case studies
load lazily. Images appear directly in the generated HTML and relevant image
schema/sitemap entries. Original source artwork is preserved.

| Image | Original bytes | Default optimized bytes | Reduction |
| --- | ---: | ---: | ---: |
| Hero | 1,360,688 | 45,138 | 97% |
| About | 157,633 | 73,042 | 54% |
| Bestseller example | 2,121,244 | 71,876 | 97% |
| Anchor example | 2,002,785 | 72,646 | 96% |
| Brij example | 2,256,412 | 84,090 | 96% |

These compare original files against default 1200px WebP variants. Browser-selected
variants depend on viewport and pixel density. See image-optimization.json.

Fonts are self-hosted WOFF2 with swap, removing Google Fonts network dependencies.
The opening loader no longer delays content. Route-level JavaScript splitting
reduced the main entry from approximately 600.77 kB / 184.55 kB gzip to 422.7 kB /
135.5 kB gzip; route/shared chunks are additional downloads. Static page generation
avoids request-time rendering. Asset cache headers are configured in Vercel.
Image dimensions reduce layout-shift risk, and initial animations no longer hide
the static page. Existing responsive navigation/layout and reduced-motion support
are retained. These are implementation improvements, not measured CWV scores.

## Validation and limits

The project commands are `npm run build`, `npm run lint`, `npm run typecheck` and
`npm test`. Build runs typecheck itself. SEO tests inspect every generated page,
unique metadata, schema JSON, real image dimensions/files, sitemap membership,
links/fragments and local HTTP statuses. Contact tests mock Resend and send no email.
Final validation passed: production build (including TypeScript), ESLint, all
26 SEO/route tests and all six mocked contact tests. All 22 generated documents
passed metadata/content/image checks. Local HTTP tests passed for canonical pages,
assets, robots, sitemap, redirects and missing-route 404 responses.

No browser or Chrome DevTools surface is available in this environment. Actual
mobile rendering, horizontal overflow, browser hydration behavior and live
LCP/CLS/INP/TTFB must be checked after deployment. Static source inspection and HTTP
tests do not substitute for those checks. Production DNS, redirects, compression,
cache delivery and indexing have not been verified here. The main JS bundle still
includes the animation system; route splitting does not eliminate that cost.

## Vercel and Search Console handoff

1. Deploy this repository with Vercel's Vite preset, build command `npm run build`,
   output `dist`, and Node 22.18 or newer. Attach ctrotech.com and www.ctrotech.com;
   select the non-www domain as primary. Preserve the checked-in routing config.
2. Configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL=Ctrotech <support@ctrotech.com>`
   and `CONTACT_TO_EMAIL=support@ctrotech.com` in Vercel, then redeploy. The sender
   domain must be verified in Resend. Test one real submission; delivery has only
   been tested with a mocked provider here.
3. In Google Search Console add the **Domain** property `ctrotech.com`. Copy the
   exact DNS TXT verification value Google supplies into the domain's DNS at root
   (`@`, or the provider's equivalent). Keep the TXT record and click Verify.
   No verification token was invented or committed.
4. Verify production robots and sitemap return 200, a made-up path returns 404,
   and HTTP/www/case/trailing-slash aliases reach the intended canonical. Check
   that production responses have no unexpected noindex header. Test a mobile
   viewport, navigation and form; run PageSpeed Insights and Google's Rich Results
   Test on the deployed site. General schema types need not produce rich results.
5. Submit **https://ctrotech.com/sitemap.xml** in Search Console's Sitemaps section.
   Inspect the exact URLs below using URL Inspection and Test Live URL. Confirm
   crawl availability, rendered content/images and the declared canonical;
   request indexing for the main pages. Monitor Page indexing and Core Web Vitals.

### Exact URLs to inspect

- https://ctrotech.com/
- https://ctrotech.com/about
- https://ctrotech.com/contact
- https://ctrotech.com/services
- https://ctrotech.com/services/software-development
- https://ctrotech.com/services/web-development
- https://ctrotech.com/services/mobile-development
- https://ctrotech.com/services/desktop-development
- https://ctrotech.com/services/embedded-systems
- https://ctrotech.com/services/api-development
- https://ctrotech.com/services/ai-automation
- https://ctrotech.com/services/cybersecurity
- https://ctrotech.com/services/cloud-infrastructure
- https://ctrotech.com/services/business-operating-systems
- https://ctrotech.com/services/software-modernization
- https://ctrotech.com/services/seo
- https://ctrotech.com/services/digital-creative

Also check https://ctrotech.com/robots.txt and https://ctrotech.com/sitemap.xml.
Publish real Insights/legal content before changing their indexing policy.
Replace example case studies with verified work when available. Google determines
rankings, image inclusion and sitelinks; these changes improve technical eligibility.

## Changed files

The adjacent `changed-files.txt` records the complete current working-tree changes,
including the earlier authorized rebrand, technology section and Resend work.
Core SEO files are `src/data/seo.ts`, `src/utils/seo.ts`, `src/utils/siteIdentity.ts`,
`src/utils/urlNormalization.ts`, `src/components/layout/Seo.tsx`, all eight page
components, `src/AppRoutes.tsx`, `src/App.tsx`, `src/main.tsx`, `src/entry-server.tsx`,
`scripts/prerender.mjs`, `scripts/optimize-images.mjs`, `scripts/preview.mjs`,
`scripts/seo.test.mjs`, `src/generated/images.json`, `public/images/*`,
`src/fonts.css`, `src/App.css`, image consumers/data/types, layout/footer/scroll
components, intro context/hooks, `middleware.ts`, `vercel.json`, `vite.config.ts`,
TypeScript/ESLint config, package manifests, README and the reports directory.

References: [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics),
[Google image guidance](https://developers.google.com/search/docs/appearance/google-images),
[Google sitelinks](https://developers.google.com/search/docs/appearance/sitelinks),
[Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json),
[Vercel custom 404](https://vercel.com/kb/guide/custom-404-page),
[Search Console verification](https://support.google.com/webmasters/answer/9008080?hl=en).
