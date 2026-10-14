import { useEffect, useRef } from "react";
import gsap from "gsap";

// Letters rise in with a staggered spring, then drift subtly away from the cursor and spring back.
export default function KineticText({ text, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const chars = [...root.querySelectorAll("[data-char]")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const intro = gsap.from(chars, { yPercent: 70, opacity: 0, rotate: 6, duration: 0.9, ease: "back.out(2.2)", stagger: 0.022, delay });
    if (!window.matchMedia("(pointer: fine)").matches) return () => intro.kill();

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
    const move = (e) => {
      if (intro.isActive()) return;
      if (!centers.length) measure();
      chars.forEach((_, i) => {
        const dx = centers[i][0] - e.clientX, dy = centers[i][1] - e.clientY;
        const d = Math.hypot(dx, dy) || 1;
        const f = Math.max(0, 1 - d / 140) ** 2;
        springs[i].x((dx / d) * f * 7);
        springs[i].y((dy / d) * f * 7 - f * 3);
      });
    };
    const leave = () => { centers = []; springs.forEach((s) => { s.x(0); s.y(0); }); };
    const host = root.closest("h1") || root;
    host.addEventListener("pointerenter", measure);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      intro.kill();
      host.removeEventListener("pointerenter", measure);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [delay]);

  const words = text.split(" ");
  // Parent heading carries the accessible name; split glyphs are hidden from assistive tech.
  return <span ref={ref} aria-hidden="true">
    {words.map((word, wi) => <span key={wi}>
      <span className="inline-block whitespace-nowrap">
        {[...word].map((ch, ci) => <span key={ci} data-char className="inline-block will-change-transform">{ch}</span>)}
      </span>
      {wi < words.length - 1 ? " " : null}
    </span>)}
  </span>;
}
