import { useEffect, useRef } from "react";
import gsap from "gsap";

export const GLYPHS = ";:<*1_/#";
export const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

// Muse Wonder-style decode: each letter flickers through glyphs, then settles in order.
export function scramble(chars, { step = 28, hold = 220 } = {}) {
  const start = performance.now();
  let last = 0;
  const tick = (now) => {
    if (now - last < 45) return requestAnimationFrame(tick);
    last = now;
    let pending = false;
    chars.forEach((el, i) => {
      if (now < start + hold + i * step) { el.textContent = glyph(); pending = true; } else el.textContent = el.dataset.char;
    });
    if (pending) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Letters rise in with a staggered spring while decoding; hovering a word re-decodes it,
// nearby letters drift from the cursor and spring back, and one letter occasionally glitches.
export default function KineticText({ text, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const chars = [...root.querySelectorAll("[data-char]")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true, idle = 0, intro;
    const cleanups = [];
    const on = (el, type, fn) => { el.addEventListener(type, fn); cleanups.push(() => el.removeEventListener(type, fn)); };

    document.fonts.ready.then(() => {
      if (!alive) return;
      // Lock each letter box to its real width (in em, so it scales) so glyphs never reflow the line.
      chars.forEach((el) => { el.style.width = `${el.getBoundingClientRect().width / parseFloat(getComputedStyle(el).fontSize)}em`; });
      intro = gsap.from(chars, { yPercent: 70, opacity: 0, rotate: 6, duration: 0.9, ease: "back.out(2.2)", stagger: 0.022, delay });
      setTimeout(() => alive && scramble(chars), delay * 1000);

      idle = setInterval(() => {
        if (document.hidden) return;
        const el = chars[Math.floor(Math.random() * chars.length)];
        el.textContent = glyph();
        setTimeout(() => { el.textContent = el.dataset.char; }, 140);
      }, 2600);

      root.querySelectorAll("[data-word]").forEach((w) => {
        let busy = false;
        on(w, "pointerenter", () => {
          if (busy || intro.isActive()) return;
          busy = true;
          scramble([...w.querySelectorAll("[data-char]")], { step: 35, hold: 120 });
          setTimeout(() => { busy = false; }, 900);
        });
      });

      if (!window.matchMedia("(pointer: fine)").matches) return;
      const springs = chars.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.45)" }),
        y: gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.45)" }),
      }));
      let centers = [];
      const measure = () => {
        centers = chars.map((el) => {
          const r = el.getBoundingClientRect();
          return [r.left + r.width / 2 - gsap.getProperty(el, "x"), r.top + r.height / 2 - gsap.getProperty(el, "y")];
        });
      };
      const host = root.closest("h1") || root;
      on(host, "pointerenter", measure);
      on(host, "pointermove", (e) => {
        if (intro.isActive()) return;
        if (!centers.length) measure();
        chars.forEach((_, i) => {
          const dx = centers[i][0] - e.clientX, dy = centers[i][1] - e.clientY;
          const d = Math.hypot(dx, dy) || 1;
          const f = Math.max(0, 1 - d / 140) ** 2;
          springs[i].x((dx / d) * f * 7);
          springs[i].y((dy / d) * f * 7 - f * 3);
        });
      });
      on(host, "pointerleave", () => { centers = []; springs.forEach((s) => { s.x(0); s.y(0); }); });
    });

    return () => {
      alive = false;
      clearInterval(idle);
      intro?.kill();
      cleanups.forEach((fn) => fn());
    };
  }, [delay]);

  const words = text.split(" ");
  // Parent heading carries the accessible name; split glyphs are hidden from assistive tech.
  return <span ref={ref} aria-hidden="true">
    {words.map((word, wi) => <span key={wi}>
      <span data-word className="inline-block whitespace-nowrap">
        {[...word].map((ch, ci) => <span key={ci} data-char={ch} className="inline-block text-center will-change-transform">{ch}</span>)}
      </span>
      {wi < words.length - 1 ? " " : null}
    </span>)}
  </span>;
}
