import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to top on route change, or to a hash target (retrying while lazy pages load). */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }
    let id: string;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      if (tries < 20) {
        tries += 1;
        timer = window.setTimeout(attempt, 100);
      }
    };
    timer = window.setTimeout(attempt, 60);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}