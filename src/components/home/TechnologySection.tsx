import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceIcon } from '../ui/ServiceIcon';
import { techCategories } from '../../data/technologies';
import { EASE_OUT } from '../../utils/motion';

export function TechnologySection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="technology" aria-labelledby="technology-title" className="scroll-mt-20 bg-white py-28 md:py-36">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            id="technology-title"
            label="Technology ecosystem"
            title="Proven technology, engineered together."
            highlight={['together.']} />
          <div className="max-w-md lg:col-span-5 lg:justify-self-end">
            <p className="text-[16px] leading-relaxed text-muted">
              From customer-facing products to the systems behind them. We select the right languages,
              frameworks and infrastructure for your performance, security and long-term needs.
            </p>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-forest-200 bg-forest-50 px-3.5 py-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-forest-600" />
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-forest-800 sm:text-[11px]">
                {techCategories.length} disciplines. One connected stack.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-b border-line pb-4 md:mt-16">
          <p className="label-mono text-forest-700">From interface to infrastructure</p>
          <span className="hidden font-mono text-[11px] text-muted sm:block">Built around your requirements</span>
        </div>

        <ul>
          {techCategories.map((category, i) => (
            <motion.li
              key={category.id}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
              className="group relative grid gap-5 border-b border-line px-1 py-7 transition-colors duration-200 hover:bg-soft motion-reduce:transition-none md:grid-cols-12 md:items-center md:gap-8 md:px-5 md:py-8">
              <div className="md:col-span-4">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-forest-100 bg-forest-50 text-forest-800 transition-colors group-hover:border-forest-800 group-hover:bg-forest-800 group-hover:text-lemon motion-reduce:transition-none">
                    <ServiceIcon name={category.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p aria-hidden="true" className="mb-0.5 font-mono text-[10px] tracking-[0.1em] text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-display text-[21px] font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[23px]">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">{category.description}</p>
              </div>
              <ul aria-label={`${category.name} technologies`} className="flex flex-wrap gap-2 md:col-span-8 md:gap-2.5">
                {category.items.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-white px-3 py-2 text-[13px] font-medium leading-snug text-ink/85 transition-colors group-hover:border-forest-200 motion-reduce:transition-none sm:px-3.5 sm:text-[14px]">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3 rounded-2xl bg-forest-950 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-8 md:px-7">
          <p className="font-display text-[19px] font-medium tracking-[-0.02em]">The right stack for what comes next.</p>
          <p className="max-w-xl text-[14px] leading-relaxed text-white/75">
            Your existing systems, your growth plans, your constraints. Every technology choice starts there.
          </p>
        </div>
      </div>
    </section>
  );
}
