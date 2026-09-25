import React, { ReactNode } from 'react';
import { AlertCircleIcon, Loader2Icon, SendIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { TextField } from './TextField';
import { ChoiceChips } from './ChoiceChips';
import { budgetRanges, projectTypes, serviceOptions, timelines } from '../../data/contact';
import type { ContactFormController } from '../../hooks/useContactForm';

export function ContactForm({ form }: {form: ContactFormController;}) {
  const { values, errors, status, setField, toggleService, submit } = form;
  const submitting = status === 'submitting';

  return (
    <form onSubmit={submit} noValidate aria-busy={submitting} className="space-y-6">
      <fieldset disabled={submitting} className="min-w-0 space-y-6">
      <FormSection number="01" title="About you">
        <div className="grid gap-5 md:grid-cols-2">
          <TextField id="field-name" label="Name" required autoComplete="name" value={values.name} onChange={(v) => setField('name', v)} error={errors.name} />
          <TextField id="field-company" label="Company" autoComplete="organization" value={values.company} onChange={(v) => setField('company', v)} />
          <TextField id="field-email" label="Email" type="email" required autoComplete="email" value={values.email} onChange={(v) => setField('email', v)} error={errors.email} />
          <TextField id="field-country" label="Country" autoComplete="country-name" value={values.country} onChange={(v) => setField('country', v)} />
          <TextField
            id="field-website"
            label="Company website"
            type="url"
            autoComplete="url"
            placeholder="example.com"
            value={values.website}
            onChange={(v) => setField('website', v)}
            error={errors.website}
            className="md:col-span-2" />
          
        </div>
      </FormSection>

      <FormSection number="02" title="The project">
        <div className="space-y-8">
          <ChoiceChips
            id="field-projectType"
            legend="Project type"
            name="projectType"
            required
            options={projectTypes}
            value={values.projectType}
            onChange={(option) => setField('projectType', option)}
            error={errors.projectType} />
          
          <ChoiceChips id="field-services" legend="Services required" name="services" multiple options={serviceOptions} value={values.services} onChange={toggleService} />
        </div>
      </FormSection>

      <FormSection number="03" title="Scope">
        <div className="space-y-8">
          <ChoiceChips id="field-budget" legend="Budget range" name="budget" options={budgetRanges} value={values.budget} onChange={(option) => setField('budget', option)} />
          <ChoiceChips id="field-timeline" legend="Timeline" name="timeline" options={timelines} value={values.timeline} onChange={(option) => setField('timeline', option)} />
          <TextField
            id="field-currentTechnology"
            label="Current technology"
            placeholder="e.g. WordPress site, Excel, a legacy .NET system, none yet"
            value={values.currentTechnology}
            onChange={(v) => setField('currentTechnology', v)} />
          
        </div>
      </FormSection>

      <FormSection number="04" title="Details">
        <div className="space-y-5">
          <TextField
            id="field-description"
            label="Project description"
            required
            multiline
            rows={5}
            placeholder="What are you trying to solve? Who uses it? What does success look like?"
            value={values.description}
            onChange={(v) => setField('description', v)}
            error={errors.description} />
          
          <TextField
            id="field-securityRequirements"
            label="Security requirements"
            multiline
            rows={3}
            placeholder="Compliance needs, sensitive data, existing security concerns…"
            value={values.securityRequirements}
            onChange={(v) => setField('securityRequirements', v)} />
          
          <TextField
            id="field-additionalInfo"
            label="Additional information"
            multiline
            rows={3}
            value={values.additionalInfo}
            onChange={(v) => setField('additionalInfo', v)} />
          
        </div>
      </FormSection>

      {status === 'error' &&
      <div role="alert" className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-[14px] text-ink">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
          Something went wrong sending your brief. Please try again in a moment.
        </div>
      }

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[13px] leading-relaxed text-muted">
          We use your details only to respond to this enquiry. Your brief is delivered securely using our email service provider.
        </p>
        <Button
          type="submit"
          disabled={submitting}
          icon={submitting ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}>
          
          {submitting ? 'Sending brief…' : 'Send project brief'}
        </Button>
      </div>
      </fieldset>
    </form>);

}

function FormSection({ number, title, children }: {number: string;title: string;children: ReactNode;}) {
  return (
    <section className="min-w-0 rounded-3xl border border-line bg-white p-4 sm:p-6 md:p-9" aria-labelledby={`form-section-${number}`}>
      <h2 id={`form-section-${number}`} className="mb-7 flex items-center gap-3 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink">
        <span className="font-mono text-[12px] font-medium text-forest-700">{number}</span>
        {title}
      </h2>
      {children}
    </section>);

}
