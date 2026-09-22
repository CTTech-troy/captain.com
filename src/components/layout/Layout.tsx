import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { IntroLoader } from './IntroLoader';
import { PageTransition } from './PageTransition';
import { ScrollManager } from './ScrollManager';
import { CustomCursor } from './CustomCursor';

export function Layout() {
  return (
    <div className="relative min-h-screen w-full bg-white text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-800 focus:px-4 focus:py-2 focus:text-white">
        
        Skip to content
      </a>
      <IntroLoader />
      <ScrollManager />
      <PageTransition />
      <CustomCursor />
      <Navigation />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen bg-white" aria-busy="true" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>);

}