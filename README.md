# Ctrotech.com

A premium marketing website for Ctrotech.com, built with React, TypeScript, Vite, and Tailwind CSS. The app is structured as a route-based experience with animated product storytelling, reusable UI primitives, service-driven pages, and conversion-focused contact flows.

## Overview

This frontend presents the Ctrotech.com brand through a clean, modern technology storytelling layout. It includes:

- a custom brand palette and typography system
- route-based pages for home, services, insights, about, contact, and legal content
- animated motion-driven sections for hero, process, and capabilities
- reusable layout primitives for navigation, footer, and page transitions
- responsive styling for desktop and mobile experiences
- contact form behavior and validation feedback

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- react-router-dom
- lucide-react

## Project Structure

```bash
frontend/
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   ├── brand/
│   │   ├── contact/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ui/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── types/
│   └── utils/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── README.md
└── .gitignore
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the app in development mode:

```bash
npm run dev -- --host 0.0.0.0
```

Then open the following in your browser:

```text
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev      # start the local Vite development server
npm run build    # optimize images, typecheck, bundle, prerender HTML and sitemap
npm run preview  # preview the production build locally
npm run lint     # run ESLint checks
npm run typecheck # check frontend, middleware and server TypeScript
npm test         # contact tests plus generated SEO/HTTP checks (build first)
```

## Production Build

### Contact form email (Resend + Vercel)

The contact form posts all 13 fields to `/api/contact`. The server sends a plain-text
email using Resend, with the visitor's email as `reply_to`. Success appears only after
Resend accepts the request; failures preserve the form so the visitor can retry.
Retries of an unchanged brief reuse an idempotency key to avoid duplicate emails.

In Vercel, use the Vite preset and set these server-side environment variables:

- `RESEND_API_KEY`: your Resend sending API key.
- `CONTACT_FROM_EMAIL`: `Ctrotech <support@ctrotech.com>` (verify ctrotech.com in Resend).
- `CONTACT_TO_EMAIL`: `support@ctrotech.com`.

Deploy/redeploy after setting the variables. The `api/contact.ts` function handles
email delivery; `vercel.json` preserves API routes while serving React page URLs.
Never prefix these settings with `VITE_` or commit an API key.

For local development, copy the settings from `.env.example` into `.env.local`, add
your key, and run `npm run dev`. Vite mounts the same server handler locally.
`npm run preview` serves only the built frontend and does not run the email endpoint.
Run `npm run test:contact` on Node 22.18+ to test delivery with a mocked Resend API;
these tests send no real email. Run `npm run build` to type-check frontend and API.

The endpoint validates and bounds input, keeps the recipient server-controlled,
and limits each IP to five attempts per minute per server instance. Configure
Vercel Firewall rate limiting for `/api/contact` for protection across instances.

References: [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email)
and [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js).

The production build is generated in `dist/`, including route HTML, `404.html`,
`robots.txt` and `sitemap.xml`. On Vercel use build command `npm run build` and
output directory `dist`. Do not add an SPA catch-all rewrite: it would turn missing
URLs into soft 404s. Middleware normalizes page URLs; Vercel serves clean URLs.

SEO metadata is maintained in `src/data/seo.ts`; service metadata comes from the
existing service data. New routes must be added to both the router and SEO registry.
Run a build and `npm test` after updating content. Empty Insights and unfinished
legal pages intentionally remain noindex until real content is published.

See [the SEO implementation report](reports/SEO-IMPLEMENTATION.md) for measured
asset savings, validation coverage and the exact Search Console setup steps.

## Styling and Design System

The UI uses a custom Tailwind theme with:

- a forest green brand palette
- a lemon accent palette
- Inter and Inter Tight typography
- custom keyframes and animations
- a shared max-width layout container and motion timing curves

The theme is defined in the app CSS and Tailwind config, making it easier to maintain design consistency across the site.

## Content and Data Organization

The app is designed around structured content modules, including:

- page metadata and copy in `src/data/`
- page-level screens in `src/pages/`
- reusable UI blocks in `src/components/`
- shared hooks and utilities in `src/hooks/` and `src/utils/`

This makes the site straightforward to extend with new services, industries, case studies, or marketing pages.

## Notes for Contributors

- Keep route-specific content in the relevant page or data module.
- Prefer reusable components for repeated UI patterns.
- Use the shared theme tokens rather than hardcoded values whenever possible.
- Validate with the project build before finalizing changes.

## License

This project is intended for business and product use as defined by the project owner unless otherwise specified.
