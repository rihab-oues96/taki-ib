# TakiAcademy – Call-to-action guidelines

Rules for every button and action link on the TakiAcademy International School website. Written so a designer, a developer or an AI assistant (Claude) applies the same logic every time. The code lives in `cta.css`; `index.html` shows each case with its HTML.

## 1. Principles

1. **One look, one size.** Every button is a 48px pill (radius 9999px), DM Sans 14px bold. No other button heights or shapes, except the 40px menu version.
2. **The background decides the button.** Pick the variant from the section's background (dark or light), not from personal taste.
3. **Hover is always blue** (`#2fa5de`). Never yellow. Yellow is only for small accents (dashes, dots, progress) and the keyboard focus outline.
4. **Keep it simple.** Buttons hold text only. The only extras are the small play circle on "Regarder maintenant" (it opens a video) and the arrow chip from rule 6.
5. **One main action per section.** A section has at most one main button, plus at most one secondary button next to it.
6. **The arrow circle is reserved.** Only "Découvrir la vie scolaire" gets the round arrow chip, because it's the key action of the "Activités de classe" section. Don't add it anywhere else unless the team decides to.
7. **Articles use a text link, not a button.** In blog / article cards the action is a text link with an arrow: "Lire l'article →".
8. **Sentence case labels.** "Notre programme", not "Notre Programme". Labels are short verbs or nouns: Pré-inscription, Contactez-nous, Notre mission, Découvrir notre programme.
9. **Every button has a real link.** Never `href="#"`.

## 2. Which CTA to use

| Situation | Class | Look | Hover |
|---|---|---|---|
| Main button on a **dark** section (hero, navy sections) | `btn btn--solid` | White pill, navy text | Blue fill, white text |
| Main button on a **light** section (white, light grey `#f4f8fb`) | `btn btn--navy` | Blue gradient `#2fa5de → #6ebfe8`, white text, soft blue glow | Lifts 2px, stronger glow |
| Secondary button on a **dark** section | `btn btn--ghost` | Glass outline: white text, translucent fill, white 32% border | Blue fill |
| Secondary button on a **light** section | `btn btn--line` | Thin grey-blue outline `#cfdde6`, navy text | Blue fill, white text |
| Menu / navigation | add `btn--sm` | Same variants at 40px, 13.5px semibold | Same |
| "Découvrir la vie scolaire" only | `btn btn--navy btn--arrow` + `<span class="btn__i">` arrow | Blue gradient + white circle with blue arrow on the right | Lifts, arrow nudges right |
| Article / blog card link | `link-arrow` (`link-arrow--light` on dark) | Text + arrow, no background, navy (white on dark) | Text turns blue, arrow slides 4px right |

`btn--navy` is the historical class name for the **blue gradient** button. Its colour changed from navy to the gradient, and the name stayed.

## 3. Decision steps

1. Is it inside an article / blog card, or is it a "read more" in a card? → **`link-arrow`**. Stop.
2. Is it in the menu? → add **`btn--sm`** to the variant below.
3. Is the section background dark (navy, photo with dark overlay)?
   - Main action → **`btn--solid`**
   - Secondary action → **`btn--ghost`**
4. Is the background light (white, `#f4f8fb`)?
   - Main action → **`btn--navy`** (blue gradient)
   - Secondary action → **`btn--line`**
5. Is it "Découvrir la vie scolaire"? → add **`btn--arrow`** and the arrow span.

## 4. Specs

| Property | Value |
|---|---|
| Height | 48px (menu: 40px) |
| Padding | 0 24px (menu: 0 18px; with arrow chip: right padding 5px) |
| Radius | 9999px (full pill) |
| Font | DM Sans, 14px, weight 700 (menu: 13.5px, 600) |
| Border | 1.5px (transparent on filled buttons) |
| Gradient | `linear-gradient(90deg, #2fa5de, #6ebfe8)` |
| Gradient shadow | `0 10px 24px -12px rgba(47,165,222,.8)`; hover `0 16px 30px -12px rgba(47,165,222,.95)` |
| Arrow chip | 36px circle, 14px arrow icon, 12px gap from the text |
| Article link | DM Sans 14.5px 700, 8px gap, 14px arrow icon |
| Focus (keyboard) | 3px yellow outline `#f6c21c`, 3px offset |
| Transitions | 0.2–0.3s, easing `cubic-bezier(.22,1,.36,1)` |
| Phones (< 640px) | Section buttons become full width; arrow button puts text left, chip right |

Colour tokens: navy `#0b3346`, blue `#2fa5de`, light blue `#6ebfe8`, yellow `#f6c21c`, off-white `#fafafa`.

## 5. Where each button is used on the homepage

| Section | Background | Buttons |
|---|---|---|
| Menu | Dark (over hero) | `btn--ghost btn--sm` Contactez-nous · `btn--solid btn--sm` Pré-inscription |
| Hero | Dark | `btn--ghost` Regarder maintenant (with play icon) · `btn--solid` Pré-inscription |
| À propos de nous | Light | `btn--navy` Notre programme |
| Pourquoi nous choisir | Dark | `btn--solid` Notre mission |
| Les activités de classe | Light | `btn--navy btn--arrow` Découvrir la vie scolaire |
| Comment inscrire votre enfant | Light | `btn--navy` Pré-inscription · `btn--line` Contactez-nous |
| Diplôme et perspectives | Light | `btn--navy` Découvrir notre programme |
| Articles / blog cards | Any | `link-arrow` Lire l'article → |

## 6. Links

| Label | URL |
|---|---|
| Pré-inscription | `https://ibtakiacademyschool.com/fr/admission` |
| Contactez-nous | `https://ibtakiacademyschool.com/fr/contact-us` |
| Notre programme / Découvrir notre programme | `https://ibtakiacademyschool.com/fr/program` |
| Notre mission | `https://ibtakiacademyschool.com/fr/mission` |
| Découvrir la vie scolaire | `https://ibtakiacademyschool.com/fr/vie-scolaire` (page to be created; the live site has `/fr/scholar-life`) |

## 7. HTML

```html
<!-- Main, dark section -->
<a class="btn btn--solid" href="https://ibtakiacademyschool.com/fr/admission">Pré-inscription</a>

<!-- Main, light section (blue gradient) -->
<a class="btn btn--navy" href="https://ibtakiacademyschool.com/fr/program">Notre programme</a>

<!-- Secondary, dark section -->
<button class="btn btn--ghost" type="button"><span class="play"></span>Regarder maintenant</button>

<!-- Secondary, light section -->
<a class="btn btn--line" href="https://ibtakiacademyschool.com/fr/contact-us">Contactez-nous</a>

<!-- Menu -->
<a class="btn btn--solid btn--sm" href="https://ibtakiacademyschool.com/fr/admission">Pré-inscription</a>

<!-- Only "Découvrir la vie scolaire" -->
<a class="btn btn--navy btn--arrow" href="https://ibtakiacademyschool.com/fr/vie-scolaire">
  Découvrir la vie scolaire
  <span class="btn__i" aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </span>
</a>

<!-- Article / blog card -->
<a class="link-arrow" href="/fr/blog/slug-de-l-article">
  Lire l'article
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
</a>
```

## 8. Don'ts

- No yellow buttons and no yellow hover.
- No navy/black filled buttons on light sections: use the blue gradient.
- No new sizes (44px, 56px, 58px…), no square corners.
- No "→" typed as text inside a button; arrows are only the chip (vie scolaire) or the article link icon.
- No pill buttons inside article cards; use `link-arrow`.
- Don't restyle buttons per section; only use the classes above.
