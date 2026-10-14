import { useEffect, useRef } from "react";
import gsap from "gsap";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Each glyph swells in weight and bends toward the cursor; the variable Geist axis does the distortion.
export function KineticHeadline({ lines, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    const chars = [...root.querySelectorAll("[data-char]")];
    gsap.fromTo(chars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: reducedMotion() ? 0 : 1.1, ease: "expo.out", stagger: 0.018, delay: 0.15 });
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;

    let centers = [], raf = 0, mx = -9999, my = -9999;
    const state = chars.map(() => ({ w: 0, x: 0, y: 0 }));
    const measure = () => { centers = chars.map((c) => { const r = c.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
    const tick = () => {
      let moving = false;
      chars.forEach((c, i) => {
        const dx = mx - centers[i][0], dy = my - centers[i][1];
        const d = Math.hypot(dx, dy);
        const f = Math.max(0, 1 - d / 260);
        const s = state[i];
        const tw = f * f, tx = f * dx * 0.1, ty = f * dy * 0.14 - f * 6;
        s.w += (tw - s.w) * 0.14; s.x += (tx - s.x) * 0.14; s.y += (ty - s.y) * 0.14;
        if (Math.abs(tw - s.w) + Math.abs(tx - s.x) > 0.002) moving = true;
        c.style.fontVariationSettings = `"wght" ${Math.round(560 + s.w * 340)}`;
        c.style.transform = `translate3d(${s.x}px,${s.y}px,0) skewX(${-s.x * 0.6}deg)`;
        c.style.color = s.w > 0.05 ? `color-mix(in oklab, var(--c, #fff), #a5f3fc ${Math.round(s.w * 100)}%)` : "";
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (!raf) { measure(); raf = requestAnimationFrame(tick); } };
    const onLeave = () => { mx = my = -9999; if (!raf) raf = requestAnimationFrame(tick); };
    const host = root.closest("section") || root;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => { cancelAnimationFrame(raf); host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave); };
  }, []);

  // Second line runs cyan -> violet glyph by glyph (background-clip breaks on transformed children).
  const tint = (i, n) => `color-mix(in oklab, #22d3ee, #a78bfa ${Math.round((i / Math.max(n - 1, 1)) * 100)}%)`;
  return <h1 ref={ref} className={className} aria-label={lines.join(" ")}>
    {lines.map((line, li) => { let n = 0; const total = line.replace(/ /g, "").length; return <span key={line} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
      {line.split(" ").map((word, wi) => <span key={wi} className="inline-block whitespace-nowrap">
        {[...word].map((ch, ci) => <span key={ci} data-char className="ix-char inline-block will-change-transform" style={li === 1 ? { "--c": tint(n++, total) } : undefined}>{ch}</span>)}
        {wi < line.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>)}
    </span>; })}
  </h1>;
}

// Pulls its child toward the pointer while hovered, then springs back.
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    const move = (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * strength); yTo((e.clientY - r.top - r.height / 2) * strength); };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [strength]);
  return <span ref={ref} className="inline-flex">{children}</span>;
}
