import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ButtonContent } from './ButtonContent';
import type { ButtonSize, ButtonVariant } from '../../utils/buttonStyles';
import { buttonClasses } from '../../utils/buttonStyles';
import { cn } from '../../utils/cn';

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  cursor?: 'open' | 'view';
  external?: boolean;
}

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  size = 'md',
  className,
  cursor = 'open',
  external = false
}: ButtonLinkProps) {
  const classes = cn(buttonClasses(variant, size), className);
  const content =
  <ButtonContent variant={variant} size={size}>
      {children}
    </ButtonContent>;


  if (external) {
    return (
      <a href={to} className={classes} data-cursor={cursor} target="_blank" rel="noopener noreferrer">
        {content}
      </a>);

  }
  return (
    <Link to={to} className={classes} data-cursor={cursor}>
      {content}
    </Link>);

}