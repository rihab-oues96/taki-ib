"use client";

import { control, Field, FormFooter, FormSuccess, Honeypot, PHONE_PATTERN } from "@/components/forms/FormParts";
import { useFormSubmission, withFallback } from "@/components/forms/useFormSubmission";
import type { ContactFormContent } from "@/lib/content/contact";

/** Contact form: sent to the admissions team, who find it in the backoffice. */
export function ContactForm({ content }: { content: ContactFormContent }) {
  const messages = withFallback(content.messages);
  const form = useFormSubmission("contact", messages);
  const { labels: l } = content;
  const p = "contact";

  if (form.status === "success") return <FormSuccess messages={messages} reference={form.reference} onAgain={form.reset} />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.submit(e.currentTarget);
      }}
      onChange={form.onChange}
      aria-busy={form.status === "sending"}
      aria-describedby="form-note"
      className="relative grid gap-5 sm:grid-cols-2"
    >
      <Honeypot />
      <Field form={form} prefix={p} name="name" label={l.name}>
        <input {...control(form, p, "name")} required maxLength={150} autoComplete="name" />
      </Field>
      <Field form={form} prefix={p} name="phone" label={l.phone}>
        <input {...control(form, p, "phone")} type="tel" required pattern={PHONE_PATTERN} maxLength={25} autoComplete="tel" />
      </Field>
      <Field form={form} prefix={p} name="email" label={l.email}>
        <input {...control(form, p, "email")} type="email" required maxLength={254} autoComplete="email" />
      </Field>
      <Field form={form} prefix={p} name="grade" label={l.grade}>
        <input {...control(form, p, "grade")} maxLength={120} />
      </Field>
      <Field form={form} prefix={p} name="topic" label={l.topic} className="sm:col-span-2">
        <select {...control(form, p, "topic")} required defaultValue={content.topics[0]}>
          {content.topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field form={form} prefix={p} name="message" label={l.message} className="sm:col-span-2">
        <textarea {...control(form, p, "message")} rows={5} maxLength={5000} />
      </Field>
      <div className="sm:col-span-2">
        <FormFooter
          form={form}
          submit={content.submit}
          note={content.note}
          noteId="form-note"
          messages={messages}
          buttonClass="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-bold text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        />
      </div>
    </form>
  );
}
