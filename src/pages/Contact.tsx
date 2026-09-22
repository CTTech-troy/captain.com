import React from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../components/layout/Seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { MaskText } from '../components/ui/MaskText';
import { ContactForm } from '../components/contact/ContactForm';
import { ContactSuccess } from '../components/contact/ContactSuccess';
import { useContactForm } from '../hooks/useContactForm';
import { nextSteps } from '../data/contact';
import { breadcrumbJsonLd } from '../utils/seo';

const CRUMBS = [
{ name: 'Home', path: '/' },
{ name: 'Contact', path: '/contact' }];


export function Contact() {
  const form = useContactForm();

  return (
    <>
      <Seo
        title="Start a Project"
        description="Tell Captain.com what you're building. We'll help define the software, security and infrastructure required to build it."
        path="/contact"
        jsonLd={[breadcrumbJsonLd(CRUMBS)]} />
      
      <section className="bg-soft pb-24 pt-28 md:pb-32 md:pt-36">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="self-start lg:sticky lg:top-28 lg:col-span-4">
            <Breadcrumbs items={CRUMBS} />
            <MaskText
              as="h1"
              text="What are you building?"
              highlight={['building?']}
              className="display-heading mt-8 text-[clamp(2.75rem,5vw,4.75rem)] leading-[0.92] text-ink" />
            
            <p className="mt-6 text-[17px] leading-relaxed text-muted">
              Tell us what you're trying to solve. We'll help define the technology required to build it.
            </p>

            {form.status !== 'success' &&
            <div className="mt-10">
                <div className="flex items-center justify-between">
                  <p className="label-mono text-muted" id="brief-progress-label">
                    Brief completeness
                  </p>
                  <p className="font-mono text-[12px] text-forest-700">{form.completion}%</p>
                </div>
                <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"
                role="progressbar"
                aria-labelledby="brief-progress-label"
                aria-valuenow={form.completion}
                aria-valuemin={0}
                aria-valuemax={100}>
                
                  <motion.div
                  className="h-full origin-left rounded-full bg-forest-700"
                  animate={{ scaleX: form.completion / 100 }}
                  transition={{ duration: 0.25 }} />
                
                </div>
                <p className="mt-2 text-[13px] text-muted">Only four fields are required. More detail helps us prepare.</p>
              </div>
            }

            <div className="mt-12 border-t border-line pt-8">
              <h2 className="label-mono text-forest-700">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {nextSteps.map((step, i) =>
                <li key={step.title} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-forest-200 bg-white font-mono text-[11px] text-forest-800">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[15px] font-medium text-ink">{step.title}</p>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                )}
              </ol>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {form.status === 'success' ? <ContactSuccess values={form.values} onReset={form.reset} /> : <ContactForm form={form} />}
          </div>
        </div>
      </section>
    </>);

}