import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { maskUp } from '../../utils/motion';
import { cn } from '../../utils/cn';

interface MaskTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  /** Words (case-insensitive, punctuation ignored) rendered in brand green. */
  highlight?: string[];
  delay?: number;
  id?: string;
}

const normalize = (word: string) => word.toLowerCase().replace(/[^a-z0-9']/g, '');

/** Word-by-word masked reveal. Each word rises out of its own clipping mask. */
export function MaskText({ text, as = 'h2', className, highlight = [], delay = 0, id }: MaskTextProps) {
  const Tag = as;
  const words = text.split(' ');
  const highlighted = highlight.map(normalize);

  return (
    <Tag id={id} className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.035, delayChildren: delay } } }}>
        
        {words.map((word, i) =>
        <Fragment key={`${word}-${i}`}>
            <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
              variants={maskUp}
              className={cn('inline-block', highlighted.includes(normalize(word)) && 'text-forest-700')}>
              
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        )}
      </motion.span>
    </Tag>);

}