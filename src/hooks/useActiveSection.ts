import { useEffect, useState } from 'react';

/** Tracks which section (by id) currently sits in the middle of the viewport. */
export function useActiveSection(ids: string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    let observer: IntersectionObserver | null = null;
    let tries = 0;
    let timer = 0;

    const attach = () => {
      const elements = key.
      split('|').
      map((id) => document.getElementById(id)).
      filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0 && tries < 20) {
        tries += 1;
        timer = window.setTimeout(attach, 250);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      elements.forEach((el) => observer?.observe(el));
    };

    attach();
    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [key, enabled]);

  return active;
}