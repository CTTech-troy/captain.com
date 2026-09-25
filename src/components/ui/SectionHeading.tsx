import React from 'react';
import { motion } from 'framer-motion';
import { CtrotechSymbol } from '../brand/CtrotechSymbol';
import { MaskText } from './MaskText';
import { fadeUp } from '../../utils/motion';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  label: string;
  title: string;
  support?: string;
  highlight?: string[];
  as?: 'h1' | 'h2';
  id?: string;
  tone?: 'light' | 'dark';
  size?: 'lg' | 'md';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  support,
  highlight,
  as = 'h2',
  id,
  tone = 'light',
  size = 'lg',
  className
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={className}>
      <p className={cn('label-mono flex items-center gap-2', dark ? 'text-lemon' : 'text-forest-700')}>
        <CtrotechSymbol size={14} className={dark ? 'text-white' : 'text-forest-700'} />
        {label}
      </p>
      <MaskText
        as={as}
        id={id}
        text={title}
        highlight={highlight}
        className={cn(
          'display-heading mt-5 leading-[0.95]',
          size === 'lg' ? 'text-[clamp(2.25rem,4.6vw,4.5rem)]' : 'text-[clamp(2rem,3.8vw,3.5rem)]',
          dark ? 'text-white' : 'text-ink'
        )} />
      
      {support &&
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className={cn('mt-6 max-w-xl text-[17px] leading-relaxed md:text-lg', dark ? 'text-white/75' : 'text-muted')}>
        
          {support}
        </motion.p>
      }
    </div>);

}