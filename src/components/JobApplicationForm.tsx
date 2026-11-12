"use client";

import { control, Field, FormFooter, FormSuccess, Honeypot, PHONE_PATTERN } from "@/components/forms/FormParts";
import { useFormSubmission, withFallback } from "@/components/forms/useFormSubmission";
import type { JobFormContent } from "@/lib/content/contact";

/** Same limits as the API, checked here first so a visitor is told before uploading. */
const CV_MAX_BYTES = 5 * 1024 * 1024;
const CV_EXTENSIONS = /\.(pdf|docx)$/i;
const CV_ACCEPT = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const FILE_FALLBACK = {
  fileMissing: "Veuillez joindre votre CV.",
  fileType: "Format non accepté : envoyez votre CV en PDF ou Word (.docx).",
  fileSize: "Votre CV dépasse la taille maximale de 5 Mo.",
};

/** Job application with the CV attached: sent to the school, who find it in the backoffice. */
export function JobApplicationForm({ content }: { content: JobFormContent }) {
  const messages = { ...FILE_FALLBACK, ...withFallback(content.messages) };
  const form = useFormSubmission("job", messages);
  const { labels: l, placeholders } = content;
  const p = "job";

  function checkCv(data: FormData): Record<string, string> {
    const cv = data.get("cv");
    if (!(cv instanceof File) || cv.size === 0) return { cv: messages.fileMissing };
    if (!CV_EXTENSIONS.test(cv.name)) return { cv: messages.fileType };
    if (cv.size > CV_MAX_BYTES) return { cv: messages.fileSize };
    return {};
  }

  if (form.status === "success") return <FormSuccess messages={messages} reference={form.reference} onAgain={form.reset} />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void form.submit(e.currentTarget, checkCv);
      }}
      onChange={form.onChange}
      aria-busy={form.status === "sending"}
      aria-describedby="job-note"
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
      <Field form={form} prefix={p} name="role" label={l.role}>
        <input {...control(form, p, "role")} required maxLength={150} placeholder={placeholders.role} />
      </Field>
      <Field form={form} prefix={p} name="cv" label={l.cvFile ?? "Votre CV"} help={content.cvHelp} className="sm:col-span-2">
        <input
          {...control(form, p, "cv")}
          type="file"
          required
          accept={CV_ACCEPT}
          className={`${control(form, p, "cv").className} cursor-pointer py-2.5 text-sm text-ink-soft file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-sky file:px-4 file:py-2 file:text-sm file:font-bold file:text-brand-deep hover:file:bg-brand hover:file:text-white`}
        />
      </Field>
      <Field form={form} prefix={p} name="link" label={l.cv} className="sm:col-span-2">
        <input {...control(form, p, "link")} type="url" maxLength={500} placeholder={placeholders.cv} />
      </Field>
      <Field form={form} prefix={p} name="message" label={l.message} className="sm:col-span-2">
        <textarea {...control(form, p, "message")} rows={5} maxLength={5000} />
      </Field>
      <div className="sm:col-span-2">
        <FormFooter
          form={form}
          submit={content.submit}
          note={content.note}
          noteId="job-note"
          messages={messages}
          buttonClass="inline-flex h-12 items-center gap-2 rounded-full bg-linear-to-r from-[#51a0d8] to-[#8bc3e8] px-7 text-sm font-bold text-white shadow-[0_14px_32px_-10px_rgba(81,160,216,.5)] transition duration-300 hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun max-[640px]:w-full max-[640px]:justify-center"
        />
      </div>
    </form>
  );
}
