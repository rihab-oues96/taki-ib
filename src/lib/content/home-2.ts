/** Home page sections: class activities, enrolment steps, testimonials heading, news heading. */
export type SectionTitle = { eyebrow: string; title: string };

export type TestimonialsHeading = SectionTitle & {
  /** Caption and signature shown under a video testimonial. */
  videoCaption: string;
  videoAuthor: string;
  watchLabel: string;
  playPrefix: string;
  paginationLabel: string;
};
export type NewsHeading = SectionTitle & {
  cta: { label: string; href: string };
  readLabel: string;
  carouselLabel: string;
  paginationLabel: string;
};

export type Testimonial = { name: string; photo: string; quote: string };
export type TestimonialVideo = { id: string; title: string; vertical: boolean };

export type ActivityTile = {
  image: string;
  alt: string;
  label: string;
  /** YouTube id; empty for a photo tile. */
  videoId: string;
  videoTitle: string;
};

export type ClassActivitiesContent = {
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  /** The mosaic is designed for eight tiles. */
  tiles: ActivityTile[];
  labels: {
    playVideo: string;
    videoBadge: string;
    previewTitle: string;
    modalLabel: string;
    modalTitle: string;
    close: string;
    youtubeFallback: string;
  };
};

export type InscriptionContent = {
  eyebrow: string;
  title: string;
  leadStrong: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stepWord: string;
  ofWord: string;
  logo: string;
  welcome: string;
  fieldsLabel: string;
  /** A step without `fields` shows the "send" animation instead of a mini form. */
  steps: { title: string; text: string; fields: { label: string; value: string }[] }[];
  sendLabel: string;
  sentLabel: string;
  helpQuestion: string;
  helpStrong: string;
};
