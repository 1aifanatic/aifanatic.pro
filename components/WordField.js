import { useEffect, useRef } from "react";
import { glyph } from "./KineticText";

const WORD = "RELIABLE", CELL_W = 150, CELL_H = 32, COLUMN = 1280; // COLUMN = .site-container max-w-7xl
const MARKS = "·:¦▮";
const DENSITY = 0.15; // share of cells showing a word at any moment

// Muse Wonder-style word field: a faint step-and-repeat grid of one word at the top of the page,
// clusters fading in and out with glyph flicker; on scroll it dissolves into sparse marks in the side
// gutters only, so text stays readable. Decorative, fixed, adds no page height.
export default function WordField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0, rows = 0, cells = [], frame = 0, last = 0, lastTick = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(innerWidth / CELL_W) + 1; rows = Math.ceil(innerHeight / CELL_H) + 1;
      cells = Array.from({ length: cols * rows }, (_, i) => {
        const on = Math.random() < DENSITY;
        return { a: on ? 1 : 0, to: on ? 1 : 0, text: WORD, seed: (i * 2654435761) >>> 0 };
      });
    };

    const tick = () => {
      // Flip a random block of cells on or off, and glitch one letter somewhere.
      const c0 = Math.floor(Math.random() * cols), r0 = Math.floor(Math.random() * rows);
      const w = 1 + Math.floor(Math.random() * 3), h = 1 + Math.floor(Math.random() * 3), to = Math.random() < DENSITY ? 1 : 0;
      for (let r = r0; r < Math.min(rows, r0 + h); r++) for (let c = c0; c < Math.min(cols, c0 + w); c++) cells[r * cols + c].to = to;
      const cell = cells[Math.floor(Math.random() * cells.length)], at = Math.floor(Math.random() * WORD.length);
      cell.text = WORD.slice(0, at) + glyph() + WORD.slice(at + 1);
      setTimeout(() => { cell.text = WORD; }, 220);
    };

    const draw = () => {
      const dark = document.documentElement.classList.contains("dark");
      const top = Math.max(0, 1 - scrollY / (innerHeight * 0.8)); // 1 at the top of the page, 0 once into content
      const colL = (innerWidth - Math.min(innerWidth, COLUMN)) / 2, colR = innerWidth - colL;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.font = "500 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.letterSpacing = "0.45em"; // ponytail: unsupported browsers draw tighter words, still fine
      ctx.textBaseline = "middle";
      const step = ctx.measureText(WORD).width / WORD.length;
      ctx.fillStyle = dark ? "rgb(214,196,160)" : "rgb(176,152,112)";
      const peak = dark ? 0.14 : 0.32;
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const cell = cells[r * cols + c];
        cell.a += (cell.to - cell.a) * (still ? 1 : 0.06);
        if (cell.a < 0.02) continue;
        const x = c * CELL_W + (r % 2) * (CELL_W / 2) - CELL_W / 2, y = r * CELL_H + CELL_H / 2;
        if (top > 0.01) { ctx.globalAlpha = cell.a * top * peak; ctx.fillText(cell.text, x, y); }
        if (top < 0.99 && (x + step * WORD.length < colL || x > colR)) {
          ctx.globalAlpha = cell.a * (1 - top) * peak * 1.4;
          for (let i = 0; i < WORD.length; i++) {
            const s = (cell.seed >>> i) & 15; // deterministic, so marks don't shimmer while scrolling
            if (s < 11) continue;
            ctx.fillText(MARKS[s % MARKS.length], x + i * step, y);
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now) => {
      frame = requestAnimationFrame(loop);
      if (document.hidden || now - last < 50) return; // ~20fps is plenty for a slow fade
      last = now;
      if (now - lastTick > 600) { lastTick = now; tick(); }
      draw();
    };

    resize(); draw();
    const onResize = () => { resize(); draw(); };
    addEventListener("resize", onResize);
    if (still) addEventListener("scroll", draw, { passive: true });
    else frame = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", onResize); removeEventListener("scroll", draw); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
