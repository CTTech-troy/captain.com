# Captain.com

A premium marketing website for Captain.com, built with React, TypeScript, Vite, and Tailwind CSS. The app is structured as a route-based experience with animated product storytelling, reusable UI primitives, service-driven pages, and conversion-focused contact flows.

## Overview

This frontend presents the Captain.com brand through a clean, modern technology storytelling layout. It includes:

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
npm run build    # run TypeScript checks and create a production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint checks
```

## Production Build

The production build is generated in the `dist/` directory. This output is suitable for deployment to a static hosting provider or a CDN.

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
