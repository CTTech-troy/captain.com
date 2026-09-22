import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ButtonLink } from '../ui/ButtonLink';
import { navLinks, brand } from '../../data/site';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';
import type { NavLink } from '../../types/content';

interface MobileMenuProps {
  open: boolean;
  isActive: (link: NavLink) => boolean;
}

export function MobileMenu({ open, isActive }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        id="mobile-menu"
        className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-white px-5 pb-8 pt-6 sm:px-8 lg:hidden"
        initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        transition={{ duration: 0.28, ease: EASE_OUT }}>
        
          <motion.ul
          className="flex flex-col"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}>
          
            {navLinks.map((link) =>
          <motion.li
            key={link.label}
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE_OUT } } }}
            className="border-b border-line">
            
                <Link
              to={link.to}
              className={cn(
                'flex items-center justify-between py-4 font-display text-3xl font-semibold tracking-[-0.03em]',
                isActive(link) ? 'text-forest-800' : 'text-ink'
              )}>
              
                  {link.label}
                  {isActive(link) && <span className="h-2 w-2 rounded-full bg-forest-500" aria-hidden="true" />}
                </Link>
              </motion.li>
          )}
          </motion.ul>
          <div className="mt-auto pt-10">
            <ButtonLink to="/contact" className="w-full justify-between">
              Start a project
            </ButtonLink>
            <p className="label-mono mt-6 text-muted">{brand.secondaryMessage}</p>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}