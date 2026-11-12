/** Sections of the "admission", "contact" and "jobs" pages. */
import type { LinkItem } from "./global";

export type Seo = { title: string; description: string };
export type Option = { value: string; label: string };

/** Texts shown while a form is being sent, once it has been received, and when it could not be. */
export type FormMessages = {
  sending: string;
  successTitle: string;
  successText: string;
  /** Label of the reference given in the confirmation, e.g. "Référence de votre demande". */
  reference: string;
  /** Button that brings the empty form back after a confirmation. */
  again: string;
  invalid: string;
  error: string;
  tooMany: string;
};

/* ------------------------------ /admission ------------------------------ */

export type AdmissionFormContent = {
  eyebrow: string;
  title: string;
  text: string;
  parentTitle: string;
  studentTitle: string;
  previousTitle: string;
  labels: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    gender: string;
    nationality: string;
    birthdate: string;
    birthplace: string;
    level: string;
    grade: string;
    studentPhone: string;
  };
  genderOptions: string[];
  levelOptions: Option[];
  /** `label` is shown on the button, `value` is what the admissions team reads. */
  previousOptions: Option[];
  submit: string;
  note: string;
  messages: FormMessages;
};

export type AdmissionContent = {
  seo: Seo;
  hero: { eyebrow: string; title: string; lead: string; primaryCta: LinkItem; secondaryCta: LinkItem };
  steps: { ariaLabel: string; items: { title: string; text: string }[] };
  form: AdmissionFormContent;
  help: { title: string; text: string; cta: LinkItem };
};

/* ------------------------------ /contact-us ----------------------------- */

export type ContactFormContent = {
  title: string;
  text: string;
  labels: { name: string; phone: string; email: string; grade: string; topic: string; message: string };
  topics: string[];
  submit: string;
  note: string;
  messages: FormMessages;
};

export type ContactContent = {
  seo: Seo;
  hero: { eyebrow: string; title: string; lead: string };
  form: ContactFormContent;
  info: { title: string; visitNote: string; cta: LinkItem; followTitle: string };
  map: { ariaLabel: string; title: string };
};

/* --------------------------------- /jobs -------------------------------- */

export type JobFormContent = {
  title: string;
  text: string;
  /** `cvFile` is the CV to attach, `cv` an optional link to an online profile. */
  labels: { name: string; phone: string; email: string; role: string; cvFile: string; cv: string; message: string };
  placeholders: { role: string; cv: string };
  /** Accepted formats and size, shown under the CV field. */
  cvHelp: string;
  submit: string;
  note: string;
  messages: FormMessages & { fileMissing: string; fileType: string; fileSize: string };
};

export type JobsContent = {
  seo: Seo;
  hero: { eyebrow: string; title: string; lead: string; cta: LinkItem };
  offers: { title: string; emptyTitle: string; emptyText: string; items: { title: string; type: string; description: string }[] };
  apply: JobFormContent;
  help: { title: string };
};
