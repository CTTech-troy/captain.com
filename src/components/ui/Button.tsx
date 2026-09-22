import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonContent } from './ButtonContent';
import type { ButtonSize, ButtonVariant } from '../../utils/buttonStyles';
import { buttonClasses } from '../../utils/buttonStyles';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', icon, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClasses(variant, size), className)} data-cursor="open" {...rest}>
      <ButtonContent variant={variant} size={size} icon={icon}>
        {children}
      </ButtonContent>
    </button>);

}