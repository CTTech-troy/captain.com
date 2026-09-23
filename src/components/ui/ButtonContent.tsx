import type { ReactNode } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import type { ButtonSize, ButtonVariant } from '../../utils/buttonStyles';
import { buttonArrowClasses, buttonFillClasses } from '../../utils/buttonStyles';
import { cn } from '../../utils/cn';

interface ButtonContentProps {
  variant: ButtonVariant;
  size: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
}

/** Shared inner layout: expanding fill, label, and an arrow that nudges forward. */
export function ButtonContent({ variant, size, children, icon }: ButtonContentProps) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out-strong group-hover:scale-x-100',
          buttonFillClasses(variant)
        )} />
      
      <span className="relative min-w-0 py-2">{children}</span>
      <span aria-hidden="true" className={buttonArrowClasses(variant, size)}>
        {icon ??
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5" />
        }
      </span>
    </>);

}
