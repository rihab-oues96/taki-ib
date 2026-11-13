"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { FormMessages } from "@/lib/content/contact";
import type { FormSubmission } from "./useFormSubmission";

export const fieldClass =
  "w-full rounded-2xl border border-navy/15 bg-white px-4 py-3.5 text-base font-normal outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20 aria-invalid:border-[#c8372d] aria-invalid:focus:border-[#c8372d] aria-invalid:focus:ring-[#c8372d]/15";

/** Same rule as the API. Browsers compile `pattern` with the `v` flag, where ( ) . - must be escaped inside a class. */
export const PHONE_PATTERN = "\\+?[\\d\\s\\(\\)\\.\\-]{6,24}";

/**
 * Props shared by every input of a form: its name, an id unique on the page, and the
 * attributes that tie it to its error message for assistive technologies.
 */
export function control(form: FormSubmission, prefix: string, name: string) {
  const id = `${prefix}-${name}`;
  const invalid = name in form.errors;
  return {
    id,
    name,
    className: fieldClass,
    "aria-invalid": invalid || undefined,
    "aria-describedby": invalid ? `${id}-error` : undefined,
  };
}

/** A label, its control and, when the field was refused, the reason. */
export function Field({
  form,
  prefix,
  name,
  label,
  help,
  className = "",
  children,
}: {
  form: FormSubmission;
  prefix: string;
  name: string;
  label: string;
  help?: string;
  className?: string;
  children: ReactNode;
}) {
  const id = `${prefix}-${name}`;
  const error = form.errors[name];
  return (
    <div className={`grid content-start gap-2 text-sm font-bold ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] font-semibold text-[#c8372d]">
          {error}
        </p>
      ) : help ? (
        <p className="text-[13px] font-normal text-ink-soft">{help}</p>
      ) : null}
    </div>
  );
}

/**
 * A field people never see or reach with the keyboard. Robots that fill every input give
 * themselves away; the API then flags the submission for the team to check.
 */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Site web (ne pas remplir)
        <input name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" data-1p-ignore data-lpignore="true" data-bwignore data-form-type="other" />
      </label>
    </div>
  );
}

/** Submit button with its sending state, the note under it and the error when sending failed. */
export function FormFooter({
  form,
  submit,
  note,
  noteId,
  messages,
  buttonClass,
}: {
  form: FormSubmission;
  submit: string;
  note: string;
  noteId: string;
  messages: FormMessages;
  buttonClass: string;
}) {
  const sending = form.status === "sending";
  return (
    <>
      <button type="submit" disabled={sending} className={`${buttonClass} disabled:pointer-events-none disabled:opacity-70`}>
        {sending ? messages.sending : submit}
        {sending ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
      </button>
      {form.error && (
        <p role="alert" className="mt-4 rounded-2xl border border-[#c8372d]/25 bg-[#c8372d]/5 px-4 py-3 text-sm font-semibold text-[#c8372d]">
          {form.error}
        </p>
      )}
      <p id={noteId} className="mt-4 text-sm text-ink-soft">
        {note}
      </p>
    </>
  );
}

/** Replaces the form once it has been received: confirmation, reference to keep, and a way back. */
export function FormSuccess({ messages, reference, onAgain }: { messages: FormMessages; reference: string | null; onAgain: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // The form the visitor was in is gone: move focus (and screen readers) to the confirmation.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    ref.current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="animate-pop-in rounded-[28px] border border-[#1e8e5a]/25 bg-[#1e8e5a]/5 px-6 py-10 text-center outline-none sm:px-10"
    >
      <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#1e8e5a]/15 text-[#1e8e5a]">
        <CheckCircle2 size={28} aria-hidden />
      </span>
      <h3 className="mt-5 text-[24px] font-semibold leading-tight tracking-[-0.025em] text-navy">{messages.successTitle}</h3>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-soft">{messages.successText}</p>
      {reference && (
        <p className="mt-6 text-sm text-ink-soft">
          {messages.reference}
          <strong className="mt-2 block font-mono text-lg tracking-[0.08em] text-navy">{reference}</strong>
        </p>
      )}
      <button
        type="button"
        onClick={onAgain}
        className="mt-7 inline-flex h-11 items-center rounded-full border-[1.5px] border-[#cfdde6] bg-white px-6 text-sm font-bold text-navy transition hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-sun"
      >
        {messages.again}
      </button>
    </div>
  );
}
