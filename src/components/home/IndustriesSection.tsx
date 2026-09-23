import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { industries } from '../../data/industries';
import { serviceTitle } from '../../utils/content';
import { useSceneProgress } from '../../hooks/useSceneProgress';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { EASE_OUT, fadeUp, staggerContainer } from '../../utils/motion';
import { cn } from '../../utils/cn';
import type { IconKey, Industry } from '../../types/content';

const total = industries.length;

/**
 * Scroll-driven industry selector: the section pins and scrolling steps
 * through the industries one after the other. Tabs jump the scroll to an
 * industry. Uses animated tabs when the content cannot fit without nested scrolling.
 */
export function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { progress, reduce } = useSceneProgress(sectionRef);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [fitsViewport, setFitsViewport] = useState(false);
  const pinned = isDesktop && fitsViewport && !reduce;

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(progress, 'change', (value) => {
    if (!pinned) return;
    setActiveIndex(Math.max(0, Math.min(total - 1, Math.floor((value - 0.01) / 0.98 * total))));
  });
  const active = industries[activeIndex];

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    let measuredWidth = 0;
    let tallestContent = 0;
    const measure = () => {
      const { width, height } = content.getBoundingClientRect();
      // Retain the tallest tab at this width so a shorter tab cannot re-pin the section.
      if (width !== measuredWidth) {
        measuredWidth = width;
        tallestContent = 0;
      }
      tallestContent = Math.max(tallestContent, height);
      const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
      setFitsViewport(tallestContent + headerHeight + 48 <= window.innerHeight);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  /** In pinned mode, selecting a tab scrolls the page to that industry's segment. */
  const goTo = (index: number) => {
    setActiveIndex(index);
    if (!pinned) {
      return;
    }
    const section = sectionRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (0.01 + (index + 0.5) / total * 0.98) * scrollable, behavior: 'instant' });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % total;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + total) % total;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = total - 1;
    if (next === null) return;
    event.preventDefault();
    goTo(next);
    tabRefs.current[next]?.focus({ preventScroll: true });
    const tab = tabRefs.current[next];
    if (!isDesktop && tab?.parentElement) {
      tab.parentElement.scrollTo({ left: tab.offsetLeft - tab.parentElement.offsetLeft, behavior: reduce ? 'instant' : 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-labelledby="industries-title"
      className={cn('scroll-mt-20 bg-white', pinned ? 'h-[520svh]' : 'py-28 md:py-36')}>
      
      <div className={cn(pinned && 'sticky top-[var(--header-height)] py-6')}>
        <div ref={contentRef} className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHeading
              className="lg:col-span-7"
              id="industries-title"
              label="Industries"
              title="Technology for real businesses."
              highlight={['real']}
              />
            
            <div className="lg:col-span-5 lg:justify-self-end lg:pb-1">
                <p className="label-mono text-muted">
                  {pinned ? 'Keep scrolling' : 'Select an industry'} — <span className="text-forest-700">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
                </p>
                <div className="mt-2 flex gap-1" aria-hidden="true">
                  {industries.map((industry, i) =>
                <span
                  key={industry.id}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors duration-200',
                    i < activeIndex && 'bg-forest-200',
                    i === activeIndex && 'bg-forest-700',
                    i > activeIndex && 'bg-line'
                  )} />

                )}
                </div>
              </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div
              role="tablist"
              aria-label="Industries"
              aria-orientation={isDesktop ? 'vertical' : 'horizontal'}
              className={cn(
                'no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:px-0'
              )}>
              
              {industries.map((industry, i) => {
                const selected = i === activeIndex;
                return (
                  <button
                    key={industry.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`industry-tab-${industry.id}`}
                    aria-selected={selected}
                    aria-controls="industry-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => goTo(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      'group relative flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2 text-[14px] font-medium transition-colors duration-200',
                      'lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:text-left',
                      'lg:py-2.5',
                      selected ? 'border-forest-800 bg-forest-800 text-white lg:bg-transparent lg:text-ink' : 'border-line text-ink/70 hover:text-ink'
                    )}>
                    
                    <span className={cn('hidden font-mono text-[11px] lg:inline', selected ? 'text-forest-700' : 'text-faint')}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="lg:font-display lg:text-[20px] lg:font-semibold lg:tracking-[-0.02em]">{industry.name}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'ml-auto hidden h-2 w-2 rounded-full bg-lemon-600 transition-transform duration-200 ease-out-strong lg:block',
                        selected ? 'scale-100' : 'scale-0'
                      )} />
                    
                    {selected &&
                    <motion.span
                      layoutId="industry-indicator"
                      className={cn('absolute -left-4 hidden w-[3px] rounded-full bg-forest-800 lg:block', pinned ? 'bottom-2 top-2' : 'bottom-3 top-3')}
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }} />

                    }
                  </button>);

              })}
            </div>

            <div
              id="industry-panel"
              role="tabpanel"
              aria-labelledby={`industry-tab-${active.id}`}
              aria-live="polite"
              className="rounded-3xl bg-soft p-6 md:p-10 lg:col-span-8 lg:self-start">
              
              <AnimatePresence mode="wait" initial={false}>
                <IndustryPanel key={active.id} industry={active} compact />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function IndustryPanel({ industry, compact }: {industry: Industry;compact: boolean;}) {
  const groups: {title: string;icon: IconKey;items: string[];}[] = [
  { title: 'Typical systems', icon: 'layout', items: industry.systems },
  { title: 'Technology requirements', icon: 'server', items: industry.technology },
  { title: 'Security requirements', icon: 'shield', items: industry.security },
  { title: 'Automation opportunities', icon: 'workflow', items: industry.automation }];


  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}>
      
      <h3 className={cn('display-heading leading-none text-ink', compact ? 'text-[clamp(2rem,3vw,2.75rem)]' : 'text-[clamp(2rem,4vw,3.25rem)]')}>
        {industry.name}
      </h3>
      <p className={cn('max-w-xl leading-relaxed text-muted', compact ? 'mt-3 text-[16px]' : 'mt-4 text-[17px]')}>{industry.summary}</p>

      <div className={compact ? 'mt-6' : 'mt-8'}>
        <p className="label-mono flex items-center gap-2 text-forest-700">
          <ServiceIcon name="sparkles" className="h-3.5 w-3.5" strokeWidth={2} />
          Relevant services
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {industry.services.map((slug) =>
          <li key={slug}>
              <Link
              to={`/services/${slug}`}
              data-cursor="open"
              className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink transition-colors duration-200 hover:border-forest-700">
              
                {serviceTitle(slug)}
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-forest-700 transition-transform duration-200 ease-out-strong group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </li>
          )}
        </ul>
      </div>

      <motion.div
        className={cn(
          'grid gap-x-10 border-t border-line md:grid-cols-2',
          compact ? 'mt-7 gap-y-6 pt-6' : 'mt-10 gap-y-8 pt-8'
        )}
        variants={staggerContainer(0.05, 0.05)}
        initial="hidden"
        animate="visible">
        
        {groups.map((group) =>
        <motion.div key={group.title} variants={fadeUp}>
            <p className="label-mono flex items-center gap-2 text-forest-700">
              <ServiceIcon name={group.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              {group.title}
            </p>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) =>
            <li key={item} className="flex gap-3 text-[15px] leading-snug text-ink/85">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-forest-600" aria-hidden="true" />
                  {item}
                </li>
            )}
            </ul>
          </motion.div>
        )}
      </motion.div>
      <p className={cn('text-[12px] text-muted', compact ? 'mt-7' : 'mt-10')}>
        Illustrative of common requirements in this industry. Every engagement is scoped individually.
      </p>
    </motion.div>);

}
