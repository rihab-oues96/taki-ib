"use client";

import { control, Field, FormFooter, FormSuccess, Honeypot, PHONE_PATTERN } from "@/components/forms/FormParts";
import { useFormSubmission, withFallback } from "@/components/forms/useFormSubmission";
import type { AdmissionFormContent } from "@/lib/content/contact";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="grid gap-5 sm:grid-cols-2">
      <legend className="mb-5 text-[22px] font-semibold tracking-[-0.025em] text-navy">{title}</legend>
      {children}
    </fieldset>
  );
}

/** Pre-registration form: sent to the admissions team, who find it in the backoffice. */
export function AdmissionForm({ content }: { content: AdmissionFormContent }) {
  const messages = withFallback(content.messages);
  const form = useFormSubmission("admission", messages);
  const { labels: l } = content;
  const p = "admission";

  if (form.status === "success") return <FormSuccess messages={messages} reference={form.reference} onAgain={form.reset} />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.submit(e.currentTarget);
      }}
      onChange={form.onChange}
      aria-busy={form.status === "sending"}
      aria-describedby="admission-note"
      className="relative grid gap-10"
    >
      <Honeypot />
      <Group title={content.parentTitle}>
        <Field form={form} prefix={p} name="parentFirstName" label={l.firstName}>
          <input {...control(form, p, "parentFirstName")} required maxLength={100} autoComplete="given-name" />
        </Field>
        <Field form={form} prefix={p} name="parentLastName" label={l.lastName}>
          <input {...control(form, p, "parentLastName")} required maxLength={100} autoComplete="family-name" />
        </Field>
        <Field form={form} prefix={p} name="parentPhone" label={l.phone}>
          <input {...control(form, p, "parentPhone")} type="tel" required pattern={PHONE_PATTERN} maxLength={25} autoComplete="tel" />
        </Field>
        <Field form={form} prefix={p} name="parentEmail" label={l.email}>
          <input {...control(form, p, "parentEmail")} type="email" required maxLength={254} autoComplete="email" />
        </Field>
        <Field form={form} prefix={p} name="parentAddress" label={l.address} className="sm:col-span-2">
          <input {...control(form, p, "parentAddress")} required maxLength={300} autoComplete="street-address" />
        </Field>
      </Group>

      <Group title={content.studentTitle}>
        <Field form={form} prefix={p} name="studentFirstName" label={l.firstName}>
          <input {...control(form, p, "studentFirstName")} required maxLength={100} />
        </Field>
        <Field form={form} prefix={p} name="studentLastName" label={l.lastName}>
          <input {...control(form, p, "studentLastName")} required maxLength={100} />
        </Field>
        <Field form={form} prefix={p} name="gender" label={l.gender}>
          <select {...control(form, p, "gender")} required defaultValue={content.genderOptions[0]}>
            {content.genderOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field form={form} prefix={p} name="nationality" label={l.nationality}>
          <input {...control(form, p, "nationality")} required maxLength={100} />
        </Field>
        <Field form={form} prefix={p} name="birthdate" label={l.birthdate}>
          <input {...control(form, p, "birthdate")} type="date" required autoComplete="off" />
        </Field>
        <Field form={form} prefix={p} name="birthplace" label={l.birthplace}>
          <input {...control(form, p, "birthplace")} required maxLength={150} />
        </Field>
        <Field form={form} prefix={p} name="level" label={l.level}>
          <select {...control(form, p, "level")} required defaultValue={content.levelOptions[0]?.value}>
            {content.levelOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field form={form} prefix={p} name="grade" label={l.grade}>
          <input {...control(form, p, "grade")} required maxLength={120} />
        </Field>
        <Field form={form} prefix={p} name="studentPhone" label={l.studentPhone} className="sm:col-span-2">
          <input {...control(form, p, "studentPhone")} type="tel" pattern={PHONE_PATTERN} maxLength={25} />
        </Field>
      </Group>

      <fieldset aria-describedby={form.errors.previousSchool ? "admission-previousSchool-error" : undefined}>
        <legend className="mb-5 text-[22px] font-semibold tracking-[-0.025em] text-navy">{content.previousTitle}</legend>
        <div className="flex flex-wrap gap-3">
          {content.previousOptions.map((o, i) => (
            <label key={o.label} className="cursor-pointer">
              <input type="radio" name="previousSchool" value={o.value} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex h-12 items-center rounded-full border-[1.5px] border-[#cfdde6] px-6 text-sm font-bold text-navy transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-sun">
                {o.label}
              </span>
            </label>
          ))}
        </div>
        {form.errors.previousSchool && (
          <p id="admission-previousSchool-error" className="mt-2 text-[13px] font-semibold text-[#c8372d]">
            {form.errors.previousSchool}
          </p>
        )}
      </fieldset>

      <div>
        <FormFooter
          form={form}
          submit={content.submit}
          note={content.note}
          noteId="admission-note"
          messages={messages}
          buttonClass="inline-flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-transparent bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] px-6 text-sm font-bold text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-10px_rgba(81,160,216,.65)] focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun max-[640px]:w-full"
        />
      </div>
    </form>
  );
}
