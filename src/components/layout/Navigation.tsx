import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';
import { ButtonLink } from '../ui/ButtonLink';
import { MobileMenu } from './MobileMenu';
import { navLinks } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../utils/cn';
import type { NavLink } from '../../types/content';

const SECTION_IDS = ['top', 'capabilities', 'industries', 'case-studies', 'technology'];

export function Navigation() {
  const { pathname, hash } = useLocation();
  const isHome = pathname === '/';
  const activeSection = useActiveSection(SECTION_IDS, isHome);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24));

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  // A route change must also dismiss menus opened before browser back/forward.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  const isActive = (link: NavLink) => {
    if (isHome && link.sectionId) return activeSection === link.sectionId;
    const base = link.to.split('#')[0];
    return !link.to.includes('#') && base !== '/' && pathname.startsWith(base);
  };

  const solid = scrolled || open;

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ease-out-strong',
        solid ? 'border-line bg-white/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      )}>
      
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-3 md:h-[72px] xl:gap-6">
        <BrandLogo className="shrink-0" />

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative block whitespace-nowrap px-2 py-2 text-[14px] font-medium transition-colors duration-200 xl:px-3',
                    active ? 'text-ink' : 'text-ink/65 hover:text-ink'
                  )}>
                  
                  <span className="link-underline">{link.label}</span>
                  {active &&
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute inset-x-0 -bottom-1 mx-auto h-1.5 w-1.5 rounded-full bg-forest-500"
                    transition={{ type: 'spring', stiffness: 500, damping: 40 }} />

                  }
                </Link>
              </li>);

          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink to="/contact" size="sm">Start a project</ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-forest-800 lg:hidden">
            
            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>
    </header>
    <MobileMenu open={open} isActive={isActive} onClose={() => setOpen(false)} />
    </>);

}
