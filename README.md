# taki-academy — public website

Next.js 16 (App Router, Cache Components) + Tailwind 4. All content comes from the CMS API (`../backoffice-back`); nothing editorial is hardcoded. See the [root README](../README.md) for the overall picture and the backoffice.

```bash
cp .env.example .env.local   # CMS_API_URL + the three secrets shared with backoffice-back/.env
npm install
npm run dev                  # http://localhost:3000 — needs the API running
npm run build && npm start   # the build prerenders pages from the API
```

## How pages get their content

`src/lib/cms.ts` is the only data layer:

```ts
const c = await getPage<MissionContent>("mission");   // sections of a page, keyed by name
const posts = await getEntries<Post>("posts");         // a list (articles, FAQ, videos…)
const post = await getEntry<Post>("posts", slug);      // one item, or null
const site = await getSite();                           // identity, contact details, socials
```

- A section hidden in the backoffice is absent, so pages render `{c.hero && <Hero content={c.hero} />}`.
- Types for each page live in `src/lib/content/`.
- Client components receive content as props; site-wide settings are available through `useSite()`.
- `rich(text)` (`src/components/Rich.tsx`) renders the editors' light markup (`*mot*`, `**mot**`, line breaks).

## Caching, publishing, preview

- CMS reads are cached (`use cache`, tag `cms`, one hour) and pages are prerendered.
- On publish the API calls `POST /api/revalidate` (secret header): the next visit gets fresh content.
- `GET /api/preview?token=…&path=…` (opened by the backoffice's *Aperçu* button) verifies the token with the API and turns on Draft Mode: the cache is bypassed and drafts are shown, with a banner to leave preview.
- Files uploaded in the backoffice are served from `/uploads/*` (rewritten to the API in `next.config.ts`); the original images remain in `public/`.
- If the API cannot be reached, `src/app/error.tsx` shows a retry screen; `global-error.tsx` covers the shared layout.

## Forms

The contact, pre-registration and job application forms (`ContactForm`, `AdmissionForm`, `JobApplicationForm`, shared parts in `src/components/forms/`) post to this site's own `POST /api/submissions/<contact|admission|job>`. That route accepts same-origin requests only, limits the size, and forwards the form to the CMS API with `CMS_FORMS_SECRET` and the visitor's address; the API validates, stores and answers with a reference. Submissions are then handled in the backoffice under **Demandes reçues**.

- Every text of a form (labels, sending / confirmation / error messages, CV help) is edited in the backoffice, in the page's form section.
- Field names in the forms are the names the API validates: a refused value comes back with the name of its input and is shown under it.
- In production the site must sit behind a reverse proxy that sets `X-Real-IP` or `X-Forwarded-For`, otherwise the per-visitor rate limit cannot tell visitors apart.

See `CTA-GUIDELINES.md` for the button rules and `AGENTS.md` before changing Next.js code.
