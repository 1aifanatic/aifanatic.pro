import { useEffect, useRef } from "react";
import { glyph } from "./KineticText";

const WORDS = ["RELIABLE", "RELIABLE", "RELIABLE", "AGENTS", "MERGED", "BUILD", "GOVERN"];
const COLS = 7, ROWS = 9;
const word = (i) => (i % 5 === 0 ? WORDS[(i * 7) % WORDS.length] : "RELIABLE");

// Faint step-and-repeat word grid (after Meta's Muse Wonder): blocks of cells fade in and out
// and single letters glitch. Decorative only; static under reduced motion.
export default function StepRepeat() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cells = [...ref.current.children];
    const tick = setInterval(() => {
      if (document.hidden) return;
      const c0 = Math.floor(Math.random() * COLS), r0 = Math.floor(Math.random() * ROWS);
      const w = 1 + Math.floor(Math.random() * 3), h = 1 + Math.floor(Math.random() * 3);
      const show = Math.random() > 0.5;
      for (let r = r0; r < Math.min(ROWS, r0 + h); r++) for (let c = c0; c < Math.min(COLS, c0 + w); c++) cells[r * COLS + c].style.opacity = show ? "" : "0";
      const cell = cells[Math.floor(Math.random() * cells.length)];
      const text = cell.dataset.w, at = Math.floor(Math.random() * text.length);
      cell.textContent = text.slice(0, at) + glyph() + text.slice(at + 1);
      setTimeout(() => { cell.textContent = text; }, 220);
    }, 650);
    return () => clearInterval(tick);
  }, []);

  return <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 grid select-none content-center gap-y-3 overflow-hidden px-4 font-mono text-[10px] uppercase tracking-[.45em] text-white/[.07]" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
    {Array.from({ length: COLS * ROWS }, (_, i) => <span key={i} data-w={word(i)} className="whitespace-nowrap transition-opacity duration-700">{word(i)}</span>)}
  </div>;
}
