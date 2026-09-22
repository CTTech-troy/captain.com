import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'lemon' | 'inverse';
export type ButtonSize = 'md' | 'sm';

export function buttonClasses(variant: ButtonVariant, size: ButtonSize): string {
  return cn(
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full font-medium',
    'transition-[color,background-color,border-color,transform] duration-200 ease-out-strong active:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-60',
    size === 'md' ? 'h-12 pl-6 pr-1.5 text-[15px]' : 'h-10 pl-4 pr-1 text-[14px]',
    variant === 'primary' && 'bg-forest-800 text-white',
    variant === 'secondary' && 'border border-ink/15 bg-white text-ink hover:border-forest-800 hover:text-white',
    variant === 'lemon' && 'bg-lemon text-ink',
    variant === 'inverse' && 'border border-white/30 text-white hover:text-forest-900'
  );
}

export function buttonFillClasses(variant: ButtonVariant): string {
  if (variant === 'primary') return 'bg-forest-950';
  if (variant === 'secondary') return 'bg-forest-800';
  return 'bg-white';
}

export function buttonArrowClasses(variant: ButtonVariant, size: ButtonSize): string {
  return cn(
    'relative flex shrink-0 items-center justify-center rounded-full transition-colors duration-200',
    size === 'md' ? 'h-9 w-9' : 'h-8 w-8',
    variant === 'primary' && 'bg-lemon text-ink',
    variant === 'secondary' && 'bg-mist text-ink group-hover:bg-lemon',
    variant === 'lemon' && 'bg-forest-800 text-white',
    variant === 'inverse' && 'bg-white/10 text-white group-hover:bg-forest-800'
  );
}