import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ChoiceChipsProps {
  id: string;
  legend: string;
  name: string;
  options: string[];
  value: string | string[];
  onChange: (option: string) => void;
  multiple?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
}

export function ChoiceChips({ id, legend, name, options, value, onChange, multiple = false, required = false, error, hint }: ChoiceChipsProps) {
  const isChecked = (option: string) => Array.isArray(value) ? value.includes(option) : value === option;
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;

  return (
    <fieldset id={id} tabIndex={-1} aria-describedby={describedBy} aria-invalid={Boolean(error)} className="min-w-0 focus:outline-none">
      <legend className="flex w-full flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[14px] font-medium text-ink">
        {legend}
        <span className={cn('text-[12px] font-normal', required ? 'text-forest-700' : 'text-muted')}>
          {required ? 'Required' : multiple ? 'Select all that apply' : 'Optional'}
        </span>
      </legend>
      {hint &&
      <p id={`${id}-hint`} className="mt-1 text-[13px] text-muted">
          {hint}
        </p>
      }
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = isChecked(option);
          return (
            <label key={option} className="relative max-w-full">
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="peer sr-only" />
              
              <span
                className={cn(
                  'flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[14px] transition-colors duration-150',
                  'peer-focus-visible:ring-2 peer-focus-visible:ring-forest-500 peer-focus-visible:ring-offset-2',
                  checked ? 'border-forest-800 bg-forest-800 text-white' : 'border-line bg-white text-ink/80 hover:border-forest-600 hover:text-ink'
                )}>
                
                {checked && <CheckIcon className="h-3.5 w-3.5 text-lemon" strokeWidth={3} aria-hidden="true" />}
                {option}
              </span>
            </label>);

        })}
      </div>
      {error &&
      <p id={`${id}-error`} className="mt-2 text-[13px] font-medium text-danger" role="alert">
          {error}
        </p>
      }
    </fieldset>);

}
