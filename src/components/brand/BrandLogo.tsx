import React from 'react';
import { Link } from 'react-router-dom';
import { CaptainSymbol } from './CaptainSymbol';
import { cn } from '../../utils/cn';

interface BrandLogoProps {
  className?: string;
  size?: 'md' | 'lg';
}

export function BrandLogo({ className, size = 'md' }: BrandLogoProps) {
  return (
    <Link
      to="/"
      aria-label="Captain.com home"
      className={cn('inline-flex items-center gap-2.5 text-forest-800', className)}>
      
      <CaptainSymbol size={size === 'lg' ? 40 : 28} />
      <span
        className={cn(
          'font-display font-semibold tracking-[-0.03em] text-ink',
          size === 'lg' ? 'text-3xl' : 'text-[19px]'
        )}>
        
        Captain<span className="text-forest-600">.com</span>
      </span>
    </Link>);

}