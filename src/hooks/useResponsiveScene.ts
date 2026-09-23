import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './useMediaQuery';
import { useSceneProgress } from './useSceneProgress';

/** Touch scenes animate as their diagram enters the viewport, using document scroll only. */
export function useResponsiveScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [fitsViewport, setFitsViewport] = useState(false);
  const canPin = finePointer && fitsViewport;
  const { progress, reduce } = useSceneProgress(
    canPin ? sectionRef : animationRef,
    canPin ? ['start start', 'end end'] : ['start 85%', 'end 75%']
  );

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const measure = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64;
      setFitsViewport(content.getBoundingClientRect().height + header + 48 <= window.innerHeight);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return { sectionRef, contentRef, animationRef, progress, reduce, pinned: canPin && !reduce };
}
