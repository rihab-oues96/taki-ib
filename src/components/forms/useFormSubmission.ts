"use client";

import { useCallback, useRef, useState } from "react";
import type { FormMessages } from "@/lib/content/contact";

export type FormType = "contact" | "admission" | "job";

/** Used only if a form section has not received its messages from the CMS yet. */
const FALLBACK: FormMessages = {
  sending: "Envoi en cours…",
  successTitle: "Votre demande a bien été envoyée",
  successText: "Merci ! Notre équipe vous répond dans les meilleurs délais.",
  reference: "Référence de votre demande",
  again: "Envoyer une autre demande",
  invalid: "Certains champs sont à corriger. Vérifiez les informations signalées puis réessayez.",
  error: "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez dans un instant.",
  tooMany: "Trop d'envois depuis votre connexion. Réessayez dans quelques minutes.",
};

export function withFallback<T extends object>(messages: T | undefined): FormMessages & T {
  return { ...FALLBACK, ...messages } as FormMessages & T;
}

interface ApiResponse {
  success: boolean;
  data?: { reference: string };
  error?: { code: string; message: string; details?: unknown };
}

type FieldErrors = Record<string, string>;

function fieldErrors(details: unknown): FieldErrors {
  const errors: FieldErrors = {};
  if (!Array.isArray(details)) return errors;
  for (const issue of details) {
    if (issue && typeof issue.path === "string" && typeof issue.message === "string" && !(issue.path in errors)) {
      errors[issue.path] = issue.message;
    }
  }
  return errors;
}

export interface FormSubmission {
  status: "idle" | "sending" | "success" | "error";
  /** Message under the button when the form could not be sent. */
  error: string | null;
  /** Problem of each field, by input name. */
  errors: FieldErrors;
  /** Reference given by the school once the form has been received. */
  reference: string | null;
  /** onSubmit of the form. `check` runs first and returns problems the browser cannot detect itself. */
  submit: (form: HTMLFormElement, check?: (data: FormData) => FieldErrors) => Promise<void>;
  /** onChange of the form: a field being corrected loses its error. */
  onChange: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Back to an empty form after a confirmation. */
  reset: () => void;
}

/**
 * Sends one of the website's forms to /api/submissions/<type> and tracks what to show:
 * sending, received (with its reference), or what went wrong, field by field when the
 * server refused some values.
 */
export function useFormSubmission(type: FormType, messages: FormMessages): FormSubmission {
  const [status, setStatus] = useState<FormSubmission["status"]>("idle");
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [reference, setReference] = useState<string | null>(null);
  // State updates are asynchronous: this is what really stops a double click from sending twice.
  const sending = useRef(false);

  const refuse = useCallback((form: HTMLFormElement, message: string, fields: FieldErrors = {}) => {
    setErrors(fields);
    setError(message);
    setStatus("error");
    const first = Object.keys(fields).find((name) => form.elements.namedItem(name) instanceof HTMLElement);
    if (first) (form.elements.namedItem(first) as HTMLElement).focus();
  }, []);

  const submit = useCallback<FormSubmission["submit"]>(
    async (form, check) => {
      if (sending.current) return;
      const data = new FormData(form);
      const problems = check?.(data) ?? {};
      if (Object.keys(problems).length) return refuse(form, messages.invalid, problems);

      sending.current = true;
      setStatus("sending");
      setError(null);
      setErrors({});
      try {
        // Only the job application carries a file; the other forms are sent as JSON.
        const multipart = type === "job";
        const res = await fetch(`/api/submissions/${type}`, {
          method: "POST",
          headers: multipart ? undefined : { "content-type": "application/json" },
          body: multipart ? data : JSON.stringify(Object.fromEntries(data)),
        });
        const payload = (await res.json().catch(() => null)) as ApiResponse | null;

        if (res.ok && payload?.success && payload.data) {
          setReference(payload.data.reference);
          setStatus("success");
        } else if (res.status === 422) {
          const fields = fieldErrors(payload?.error?.details);
          refuse(form, Object.keys(fields).length ? messages.invalid : messages.error, fields);
        } else if (res.status === 429) {
          refuse(form, messages.tooMany);
        } else if (res.status === 400 || res.status === 413) {
          // The API explains these itself (file too large, malformed upload).
          refuse(form, payload?.error?.message ?? messages.error);
        } else {
          refuse(form, messages.error);
        }
      } catch {
        refuse(form, messages.error);
      } finally {
        sending.current = false;
      }
    },
    [type, messages, refuse],
  );

  const onChange = useCallback<FormSubmission["onChange"]>((event) => {
    const { name } = event.target as unknown as { name?: string };
    if (!name) return;
    setErrors((current) => {
      if (!(name in current)) return current;
      const rest = { ...current };
      delete rest[name];
      return rest;
    });
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setErrors({});
    setReference(null);
  }, []);

  return { status, error, errors, reference, submit, onChange, reset };
}
