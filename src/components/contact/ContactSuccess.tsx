import React from 'react';
import { motion } from 'framer-motion';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';
import { EASE_OUT } from '../../utils/motion';
import type { ContactFormValues } from '../../hooks/useContactForm';

interface ContactSuccessProps {
  values: ContactFormValues;
  onReset: () => void;
}

export function ContactSuccess({ values, onReset }: ContactSuccessProps) {
  const summary: [string, string][] = [
  ['Project type', values.projectType],
  ['Services', values.services.join(', ') || '—'],
  ['Budget', values.budget || '—'],
  ['Timeline', values.timeline || '—']];


  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className="rounded-3xl bg-forest-800 p-8 text-white md:p-12">
      
      <CaptainSymbol size={56} draw className="text-white" />
      <h2 className="display-heading mt-8 text-[clamp(2rem,4vw,3.25rem)] leading-none">Brief received.</h2>
      <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-white/80">
        Thank you, {values.name.split(' ')[0]}. An engineer will review what you’re building and reply to {values.email}.
      </p>
      <dl className="mt-10 grid gap-x-8 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-2">
        {summary.map(([term, value]) =>
        <div key={term}>
            <dt className="label-mono text-lemon">{term}</dt>
            <dd className="mt-1 text-[15px] text-white/90">{value}</dd>
          </div>
        )}
      </dl>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink to="/services" variant="lemon">
          Explore services
        </ButtonLink>
        <Button variant="inverse" onClick={onReset}>
          Submit another brief
        </Button>
      </div>
    </motion.div>);

}