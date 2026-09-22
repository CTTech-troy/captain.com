import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { CaptainSymbol } from '../brand/CaptainSymbol';
import { ServiceIcon } from '../ui/ServiceIcon';
import { HeroPhoneScreen } from './HeroPhoneScreen';
import { heroChips } from '../../data/scenes';
import { EASE_OUT } from '../../utils/motion';
import { cn } from '../../utils/cn';

const LAPTOP_SCREEN_IMAGE = "/image.png";

/**
 * Chip placement, matched by index to heroChips. Chips sit around the devices
 * (never over their screens); connector lines share the 100×80 SVG space.
 */
const CHIP_LAYOUT = [
{ className: 'left-[1%] top-0', line: 'M16 6 C 20 9, 24 12, 28 15' },
{ className: 'right-[1%] top-0', line: 'M82 6 C 78 9, 74 12, 71 15' },
{ className: '-left-[3%] top-[56%] hidden sm:flex', line: 'M10 50 C 13 48, 17 46, 21 44' },
{ className: 'left-[3%] bottom-[1%] sm:bottom-0', line: 'M18 73 C 22 70, 26 66, 29 62' },
{ className: '-right-[2%] top-[17%] hidden sm:flex', line: 'M88 20 C 87 23, 86 26, 85 29' },
{ className: 'bottom-[-3%] left-[36%] hidden md:flex', line: 'M52 76 C 55 72, 58 68, 61 64' }];


interface HeroVisualProps {
  ready: boolean;
  ringRotate: MotionValue<number>;
}

export function HeroVisual({ ready, ringRotate }: HeroVisualProps) {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px] lg:max-w-[640px]">
      {/* The symbol, enlarged, becomes the orbit of the ecosystem */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <motion.div
          className="h-full w-full text-mist"
          style={{ rotate: ringRotate }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, ease: EASE_OUT }}>
          
          <CaptainSymbol size="100%" strokeWidth={1.4} showAccent={false} />
        </motion.div>
      </div>

      <svg viewBox="0 0 100 80" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {CHIP_LAYOUT.map((chip, i) =>
        <motion.path
          key={i}
          d={chip.line}
          fill="none"
          stroke="#BFE3CD"
          strokeWidth={0.35}
          className="flow-line"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }} />

        )}
      </svg>

      {/* Laptop displaying the Captain.com landing page */}
      <motion.div
        className="absolute left-[4%] top-[13%] w-[80%]"
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.3, delay: 0.25, ease: EASE_OUT }}>
        
        <div className="rounded-t-[14px] border-[5px] border-b-0 border-ink bg-ink shadow-[0_40px_80px_-40px_rgba(11,21,17,0.4)] sm:border-[6px]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[7px] bg-white">
            <img
              src={LAPTOP_SCREEN_IMAGE}
              alt="The Captain.com website shown on a laptop"
              loading="eager"
              decoding="async"
              className="absolute right-0 top-0 h-full w-auto max-w-none" />
            
          </div>
        </div>
        <div className="relative -mx-[6%] h-2.5 rounded-b-xl bg-line sm:h-3">
          <span className="absolute left-1/2 top-0 h-1 w-[16%] -translate-x-1/2 rounded-b-md bg-faint/40" />
        </div>
      </motion.div>

      {/* Phone displaying the AI automation interface */}
      <motion.div
        className="absolute bottom-[4%] right-[4%] w-[27%]"
        initial={{ opacity: 0, x: 32 }}
        animate={ready ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: 0.4, ease: EASE_OUT }}>
        
        <div className="aspect-[9/19] overflow-hidden rounded-[18px] border-4 border-ink bg-white shadow-[0_30px_60px_-30px_rgba(11,21,17,0.45)] sm:rounded-[22px] sm:border-[5px]">
          <HeroPhoneScreen ready={ready} />
        </div>
      </motion.div>

      {heroChips.map((chip, i) =>
      <motion.div
        key={chip.id}
        className={cn(
          'absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white/95 py-1 pl-1 pr-2.5 shadow-[0_8px_24px_-12px_rgba(11,21,17,0.18)] sm:gap-2 sm:pr-3',
          CHIP_LAYOUT[i].className
        )}
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.25, delay: 0.55 + i * 0.06, ease: EASE_OUT }}>
        
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-forest-50 text-forest-700 sm:h-6 sm:w-6">
            <ServiceIcon name={chip.icon} className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
            {chip.id === 'workflows' &&
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-lemon-600">
                <span className="absolute inset-0 rounded-full bg-lemon-600 animate-soft-pulse" />
              </span>
          }
          </span>
          <span className="font-mono text-[8.5px] font-medium uppercase tracking-[0.1em] text-ink sm:text-[10px] sm:tracking-[0.12em]">
            {chip.label}
          </span>
        </motion.div>
      )}
    </div>);

}