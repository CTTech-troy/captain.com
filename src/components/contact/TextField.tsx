import React from 'react';
import { cn } from '../../utils/cn';

interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'url';
  autoComplete?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  className?: string;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  required = false,
  type = 'text',
  autoComplete,
  placeholder,
  multiline = false,
  rows = 4,
  className
}: TextFieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;
  const fieldClasses = cn(
    'mt-2 w-full min-w-0 rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-faint',
    'transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4',
    error ? 'border-danger focus:border-danger focus:ring-danger/10' : 'border-line focus:border-forest-700 focus:ring-forest-100'
  );

  return (
    <div className={className}>
      <label htmlFor={id} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[14px] font-medium text-ink">
        {label}
        <span className={cn('text-[12px] font-normal', required ? 'text-forest-700' : 'text-muted')}>{required ? 'Required' : 'Optional'}</span>
      </label>
      {multiline ?
      <textarea
        id={id}
        maxLength={10000}
        value={value}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        aria-required={required}
        onChange={(e) => onChange(e.target.value)}
        className={cn(fieldClasses, 'resize-y leading-relaxed')} /> :


      <input
        id={id}
        maxLength={type === 'email' ? 254 : 500}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        aria-required={required}
        onChange={(e) => onChange(e.target.value)}
        className={fieldClasses} />

      }
      {hint && !error &&
      <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted">
          {hint}
        </p>
      }
      {error &&
      <p id={`${id}-error`} className="mt-1.5 text-[13px] font-medium text-danger" role="alert">
          {error}
        </p>
      }
    </div>);

}
