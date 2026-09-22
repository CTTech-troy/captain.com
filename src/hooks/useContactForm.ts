import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

export interface ContactFormValues {
  name: string;
  company: string;
  email: string;
  country: string;
  website: string;
  projectType: string;
  services: string[];
  budget: string;
  timeline: string;
  currentTechnology: string;
  description: string;
  securityRequirements: string;
  additionalInfo: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
export type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  country: '',
  website: '',
  projectType: '',
  services: [],
  budget: '',
  timeline: '',
  currentTechnology: '',
  description: '',
  securityRequirements: '',
  additionalInfo: ''
};

const FIELD_ORDER: (keyof ContactFormValues)[] = ['name', 'email', 'website', 'projectType', 'description'];

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactStatus>('idle');

  const setField = <K extends keyof ContactFormValues,>(key: K, value: ContactFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => current[key] ? { ...current, [key]: undefined } : current);
  };

  const toggleService = (service: string) => {
    setField(
      'services',
      values.services.includes(service) ? values.services.filter((s) => s !== service) : [...values.services, service]
    );
  };

  const completion = useMemo(() => {
    const entries = Object.values(values);
    const filled = entries.filter((v) => Array.isArray(v) ? v.length > 0 : v.trim().length > 0).length;
    return Math.round(filled / entries.length * 100);
  }, [values]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      await submitBrief(values);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setStatus('idle');
  };

  return { values, errors, status, completion, setField, toggleService, submit, reset };
}

export type ContactFormController = ReturnType<typeof useContactForm>;

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) errors.email = 'We need an email address to reply.';else
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'This email address doesn’t look right.';
  if (values.website.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(values.website.trim())) {
    errors.website = 'Please enter a valid website, e.g. example.com.';
  }
  if (!values.projectType) errors.projectType = 'Choose the option closest to your project.';
  if (values.description.trim().length < 20) errors.description = 'A few sentences (20+ characters) help us prepare.';
  return errors;
}

/** Integration point: replace with the production API / CRM endpoint. */
async function submitBrief(values: ContactFormValues): Promise<void> {
  await new Promise((resolve) => window.setTimeout(resolve, 1200));
  if (!values.email) throw new Error('Missing email');
}