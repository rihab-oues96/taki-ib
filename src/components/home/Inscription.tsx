"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { rich } from "@/components/Rich";
import { useSite } from "@/components/SiteProvider";
import type { InscriptionContent } from "@/lib/content/home-2";

export function Inscription({ content }: { content: InscriptionContent }) {
  const site = useSite();
  const steps = content.steps;
  const jrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = jrRef.current;
    if (!root) return;
    const jr: HTMLDivElement = root;
    const svg = jr.querySelector<SVGSVGElement>(".jr__svg")!;
    const base = svg.querySelector<SVGPathElement>(".jr__base")!;
    const prog = svg.querySelector<SVGPathElement>(".jr__prog")!;
    const dot = svg.querySelector<SVGCircleElement>(".jr__dot")!;
    const stepEls = [...jr.querySelectorAll<HTMLElement>(".st")];
    const nodes = stepEls.map((s) => s.querySelector<HTMLElement>(".st__node")!);
    const vline = jr.querySelector<HTMLElement>(".jr__vline");
    const dest = jr.querySelector<HTMLElement>(".jr__dest")!;
    const nEl = jr.querySelector<HTMLElement>(".jr__n")!;
    const bars = [...jr.querySelectorAll<HTMLElement>(".jr__bars i")];
    const minis = stepEls.map((s) => [...s.querySelectorAll<HTMLElement>(".mini__f")]);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let arrived = false;
    let lastNow = -2;
    let typer: ReturnType<typeof setInterval> | undefined;
    let len = 0;
    let stops: number[] = [];

    const syncMini = (now: number) => {
      if (now === lastNow) return;
      lastNow = now;
      clearInterval(typer);
      minis.forEach((fs, k) =>
        fs.forEach((f) => {
          const b = f.querySelector("b")!;
          f.classList.remove("is-typing");
          if (k < now || (reduce && k <= now)) {
            b.textContent = b.dataset.v ?? "";
            f.classList.add("is-filled");
          } else {
            b.textContent = "";
            f.classList.remove("is-filled");
          }
        }),
      );
      if (reduce || now < 0 || !minis[now]?.length) return;
      const fs = minis[now];
      let i = 0;
      let c = 0;
      typer = setInterval(() => {
        const f = fs[i];
        if (!f) return clearInterval(typer);
        const b = f.querySelector("b")!;
        const v = b.dataset.v ?? "";
        f.classList.add("is-typing");
        c++;
        b.textContent = v.slice(0, c);
        if (c >= v.length) {
          f.classList.remove("is-typing");
          f.classList.add("is-filled");
          i++;
          c = 0;
        }
      }, 45);
    };

    const counter = (now: number, end: boolean) => {
      nEl.textContent = String(Math.max(1, now + 1));
      bars.forEach((b, i) => {
        b.classList.toggle("on", i <= now && !end);
        b.classList.toggle("end", end);
      });
    };

    const confetti = (x: number, y: number) => {
      if (reduce) return;
      const cols = ["#2fa5de", "#f6c21c", "#6ebfe8", "#0b3346", "#ee5c70"];
      for (let i = 0; i < 22; i++) {
        const c = document.createElement("span");
        c.className = "jr__conf";
        c.style.left = x + "px";
        c.style.top = y + "px";
        c.style.background = cols[i % cols.length];
        if (i % 3 === 0) {
          c.style.borderRadius = "2px";
          c.style.width = "10px";
          c.style.height = "5px";
        }
        jr.appendChild(c);
        const a = Math.random() * Math.PI * 2;
        const d = 50 + Math.random() * 70;
        c.animate(
          [
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 20}px) rotate(${Math.random() * 360}deg) scale(.6)`, opacity: 0 },
          ],
          { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" },
        ).onfinish = () => c.remove();
      }
    };

    const burst = (el: HTMLElement) => {
      const b = el.getBoundingClientRect();
      const r = jr.getBoundingClientRect();
      confetti(b.left - r.left + b.width / 2, b.top - r.top + b.height / 2);
    };

    // smooth wave through the four step circles (desktop only)
    const build = () => {
      if (innerWidth <= 1000 || nodes.length === 0) return;
      const r = jr.getBoundingClientRect();
      const pts = nodes.map((n) => {
        const b = n.getBoundingClientRect();
        return [b.left - r.left + b.width / 2, b.top - r.top + b.height / 2];
      });
      const start = [pts[0][0] - 40, pts[0][1]];
      const lastPt = pts[pts.length - 1];
      const end = [lastPt[0] + 175, lastPt[1] - 40];
      dest.style.left = end[0] + "px";
      dest.style.top = end[1] + "px";
      const all = [start, ...pts, end];
      let d = `M${all[0][0]},${all[0][1]}`;
      for (let i = 1; i < all.length; i++) {
        const [x0, y0] = all[i - 1];
        const [x1, y1] = all[i];
        const mx = (x0 + x1) / 2;
        d += ` C${mx},${y0} ${mx},${y1} ${x1},${y1}`;
      }
      base.setAttribute("d", d);
      prog.setAttribute("d", d);
      len = prog.getTotalLength();
      prog.style.strokeDasharray = String(len);
      stops = pts.map(([x]) => {
        let lo = 0;
        let hi = len;
        for (let k = 0; k < 24; k++) {
          const m = (lo + hi) / 2;
          if (prog.getPointAtLength(m).x < x) lo = m;
          else hi = m;
        }
        return lo / len;
      });
      update();
    };

    const setProgress = (p: number) => {
      p = Math.max(0, Math.min(1, p));
      if (innerWidth > 1000 && len) {
        prog.style.strokeDashoffset = String(len * (1 - p));
        const pt = prog.getPointAtLength(len * p);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        let now = -1;
        stepEls.forEach((s, i) => {
          const done = p >= stops[i] - 0.005;
          s.classList.toggle("is-done", done);
          if (done) now = i;
        });
        const end = p >= 0.995;
        stepEls.forEach((s, i) => s.classList.toggle("is-now", i === now && !end));
        counter(now, end);
        syncMini(now);
        if (end && !arrived) {
          arrived = true;
          jr.classList.add("is-arrived");
          burst(dest);
        }
        if (!end && p < 0.9 && arrived) {
          arrived = false;
          jr.classList.remove("is-arrived");
        }
      } else {
        // mobile / tablet: steps light up as they cross the middle of the screen
        let now = -1;
        stepEls.forEach((s, i) => {
          const b = nodes[i].getBoundingClientRect();
          const done = b.top + b.height / 2 < innerHeight * 0.62;
          s.classList.toggle("is-done", done);
          if (done) now = i;
        });
        const last = stepEls.length - 1;
        stepEls.forEach((s, i) => s.classList.toggle("is-now", i === now));
        counter(now, now === last);
        syncMini(now);
        jr.classList.toggle("is-arrived", now === last);
        if (now === last && !arrived) {
          arrived = true;
          burst(nodes[now]);
        }
        if (now < last - 1 && arrived) arrived = false;
        if (vline) {
          const r = jr.getBoundingClientRect();
          const f = nodes[0].getBoundingClientRect();
          const l = nodes[last].getBoundingClientRect();
          vline.style.top = f.top - r.top + f.height / 2 + "px";
          vline.style.bottom = "auto";
          vline.style.height = l.top - f.top + "px";
          const v = (innerHeight * 0.62 - r.top - 26) / (r.height - 52);
          vline.style.setProperty("--p", Math.max(0, Math.min(1, v)) * 100 + "%");
        }
      }
    };

    // progress follows scroll: starts when the board enters, ends when its middle passes ~48% of the screen
    function update() {
      if (reduce) return setProgress(1);
      const r = jr.getBoundingClientRect();
      const startY = innerHeight * 0.85;
      const endY = innerHeight * 0.48;
      setProgress((startY - (r.top + r.height / 2)) / (startY - endY));
    }

    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", build);
    document.fonts?.ready.then(build);
    const t = setTimeout(build, 900); // after the reveal animation settles
    build();
    update();

    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", build);
      clearTimeout(t);
      clearInterval(typer);
    };
  }, [steps.length]);

  return (
    <section className="ins" id="inscription" aria-labelledby="insTitle">
      <div className="ins__wrap">
        <Reveal>
          <div className="ins__head">
            <div>
              <p className="ins__eyebrow">{content.eyebrow}</p>
              <h2 className="ins__title" id="insTitle">
                {rich(content.title)}
              </h2>
              <p className="ins__lead">
                <b>{content.leadStrong}</b>
                {content.lead}
              </p>
            </div>
            <div className="ins__ctas">
              <a className="ins__btn" href={content.primaryCta.href}>
                {content.primaryCta.label}
              </a>
              <Link className="ins__btn ins__btn--ghost" href={content.secondaryCta.href}>
                {content.secondaryCta.label}
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="jr" id="journey" ref={jrRef}>
            <p className="jr__count" aria-live="polite">
              <span>
                {content.stepWord} <b className="jr__n">1</b> {content.ofWord} {steps.length}
              </span>
              <span className="jr__bars" aria-hidden="true">
                {steps.map((_, i) => (
                  <i key={i} />
                ))}
              </span>
            </p>
            <div className="jr__dest" aria-hidden="true">
              <Image src={content.logo} alt="" width={180} height={72} />
              <span>{content.welcome}</span>
            </div>
            <svg className="jr__svg" aria-hidden="true">
              <path className="jr__base" />
              <path className="jr__prog" />
              <circle className="jr__dot" r="9" />
            </svg>
            <div className="jr__vline" aria-hidden="true">
              <span />
            </div>
            <ol className="jr__steps">
              {steps.map((s, i) => (
                <li key={i} className={`st${i === steps.length - 1 ? " st--end" : ""}`}>
                  <span className="st__node" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div className="st__body">
                    <h3 className="st__title">{s.title}</h3>
                    <p className="st__text">{s.text}</p>
                    {s.fields.length > 0 ? (
                      <div className="mini" aria-label={content.fieldsLabel}>
                        {s.fields.map((f) => (
                          <div className="mini__f" key={f.label}>
                            <span>{f.label}</span>
                            <b data-v={f.value} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="mini__send" aria-hidden="true">
                        <span className="s1">{content.sendLabel}</span>
                        <span className="s2">{content.sentLabel}</span>
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="ins__help">
            <span>{content.helpQuestion}</span> <strong>{content.helpStrong}</strong>{" "}
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
