import { useEffect, useRef } from "react";

// Port of Meta's Muse Wonder hero (artifacts/introducing-muse-wonder/step-and-repeat/v6), constants from its shipped
// snapshot: a step-and-repeat word grid split into Voronoi "sections" that reveal in seeded order, then 18% of sections
// switch off every 1.55s; 1% of glyphs swap to symbols every 0.45s; the pointer cuts a boat wake (█⣿:) and struck
// words become a swap word for 2s. Cells under page text fade out (the "hero room"). Once scrolled into content,
// only faint glyph runs remain in the side gutters, drifting with reverse parallax. Decorative, fixed, no page height.
const WORD = "RELIABLE", SWAPS = ["AGENTIC", "BUILD", "SHIP", "TRUST"];
const POOL = [..."✹✺✻⌃<>#@*;:01░▒▓⠁⠃⠇⠋⠙⠿⣿"], WAKE = ["█", "⣿", ":"], GUTTER = [..."·⠄░▒⣿⠿▒"];
const COLUMN = 1280; // .site-container max-w-7xl
const T = { reveal: 5.2 / 4.25, fade: 0.05, shuffle: 0.18, every: 1.55, rand: 0.01, randEvery: 0.45, wake: 0.35, swap: 2, tint: 1.5, room: 0.42 };
const COLORS = {
  light: { glyph: [226, 215, 203], wakeA: [1, 122, 255], wakeB: [112, 181, 255], post: [1, 122, 255], gutter: [226, 219, 202], gutterWake: [65, 161, 251] },
  dark: { glyph: [56, 60, 58], wakeA: [209, 209, 209], wakeB: [138, 138, 138], post: [118, 111, 101], gutter: [46, 50, 48], gutterWake: [118, 115, 111] },
};
const ROOM = "img, svg, button, input, textarea, select, video, iframe"; // plus every visible text node
const FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const hash = (a, b, salt) => {
  let h = Math.imul(a + 1, 0x27d4eb2d) ^ Math.imul(b + 7, 0x165667b1) ^ Math.imul(salt + 13, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b); h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const smoother = (x) => (x = clamp(x), x * x * x * (x * (x * 6 - 15) + 10));
const rgb = (a, b = a, k = 0) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k))})`;

export default function WordField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spacing = "letterSpacing" in ctx; // ponytail: no letterSpacing → every word drawn glyph by glyph
    let g = {}, cells = [], rects = [], trail = [], wakes = new Map(), masks = new Map();
    let frame = 0, start = performance.now(), prev = 0, roomAt = 0, wakeSeq = 0;
    const pointer = { x: -1e4, y: -1e4, t: -1e4, px: null, py: null, pt: 0 };

    const resize = () => {
      const W = innerWidth, H = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2), mobile = W < 768;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const s = mobile ? W / 900 : W / 1600; // source layouts: desktop 1600×900, mobile 900×900
      const L = mobile ? { size: 22, ls: 3, gap: 20, row: 16, base: 80, sections: 10 } : { size: 13, ls: 4, gap: 24, row: 12, base: 220, sections: 63 };
      const size = L.size * s, ls = L.ls * s;
      ctx.font = `350 ${size}px ${FONT}`; if (spacing) ctx.letterSpacing = "0px";
      const cw = ctx.measureText("M").width, step = cw + ls, slot = WORD.length * step - ls;
      const px = slot + L.gap * s, py = size + L.row * s;
      const cols = Math.ceil(W / px) + 1, rows = Math.ceil(H / py) + 1, x0 = (W - (cols * px - L.gap * s)) / 2;
      const n = Math.min(cols * rows, Math.max(1, Math.round((L.sections * cols * rows) / L.base)));
      const seeds = Array.from({ length: cols * rows }, (_, i) => i).sort((a, b) => hash(a, 0, 101) - hash(b, 0, 101)).slice(0, n)
        .map((i, k) => ({ i, k, x: (i % cols) / cols, y: Math.floor(i / cols) / rows, order: hash(k, 0, 103) }));
      const rank = new Map([...seeds].sort((a, b) => a.order - b.order).map((sd, r) => [sd.k, r]));
      cells = Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        let best = Infinity, sec = 0;
        for (const sd of seeds) {
          const d = sd.i === i ? -1 : (c / cols - sd.x) ** 2 + ((r / rows - sd.y) * (H / W)) ** 2 + (hash(r, c, sd.k + 300) - 0.5) * 0.004;
          if (d < best) { best = d; sec = sd.k; }
        }
        return { i, x: x0 + c * px, y: r * py + py / 2, sec, rank: rank.get(sec), local: hash(r, c, 401), room: 0, swap: null };
      });
      g = { W, H, size, step, slot, n, spread: 180 * s, margin: 18 * s };
      wakes.clear(); masks.clear(); trail = []; measureRoom();
      cells.forEach((cell) => { cell.room = +cell.blocked; });
    };

    // Cells overlapping visible text fade out, the way Muse carves a room around its headline.
    const measureRoom = () => {
      rects = [...document.querySelectorAll(ROOM)].map((el) => el.getBoundingClientRect());
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), range = document.createRange();
      for (let node; (node = walk.nextNode());) {
        if (!node.data.trim()) continue;
        range.selectNodeContents(node); rects.push(range.getBoundingClientRect());
      }
      rects = rects.filter((r) => r.width && r.bottom > 0 && r.top < g.H);
      const m = g.margin, h = g.size / 2;
      for (const cell of cells) cell.blocked = rects.some((r) => cell.x < r.right + m && cell.x + g.slot > r.left - m && cell.y + h > r.top - m && cell.y - h < r.bottom + m);
    };

    const hidden = (gen) => { // seeded set of sections switched off in shuffle generation `gen`
      if (gen < 0) return new Set();
      if (!masks.has(gen)) {
        const ranked = Array.from({ length: g.n }, (_, k) => k).sort((a, b) => hash(a, gen, 551) - hash(b, gen, 551));
        masks.set(gen, new Set(ranked.slice(0, Math.round(g.n * T.shuffle))));
        if (masks.size > 4) masks.delete(masks.keys().next().value);
      }
      return masks.get(gen);
    };

    // Boat wake: each trail sample pushes two lines outward from the cursor path; glyphs they cross cycle █ ⣿ :.
    const wakeAt = (id, x, y, t, cell) => {
      for (let k = trail.length - 1; k >= 0; k--) {
        const p = trail[k], age = t - p.t, q = age / T.wake, ox = x - p.x, oy = y - p.y;
        const lateral = Math.abs(ox * -p.dy + oy * p.dx), along = ox * p.dx + oy * p.dy;
        if (Math.abs(lateral - (5 + q ** 0.72 * g.spread)) > Math.max(7, g.size * 0.32) * (1 - q * 0.25)) continue;
        if (Math.abs(along + q * (12 + p.sp * 26)) > 22 + p.sp * 14) continue;
        const w = wakes.get(id);
        if (!w || t >= w.release) {
          wakes.set(id, { start: t, end: t + T.wake * 0.72, release: t + T.wake * 1.15 });
          if (!cell.swap || t > cell.swap.until) {
            const at = t + T.wake * 0.72;
            cell.swap = { word: SWAPS[Math.floor(hash(cell.i, wakeSeq++, 7) * SWAPS.length)], at, until: at + T.swap };
          }
        }
        break;
      }
      const w = wakes.get(id);
      if (!w || t >= w.end) { if (w && t >= w.release) wakes.delete(id); return -1; }
      return (t - w.start) / (w.end - w.start);
    };

    const draw = (now) => {
      const t = still ? T.reveal + 0.5 : (now - start) / 1000, dt = clamp(t - prev, 0, 0.1); prev = t;
      const pal = COLORS[document.documentElement.classList.contains("dark") ? "dark" : "light"];
      const { W, H, size, step } = g, top = Math.max(0, 1 - scrollY / (H * 0.8));
      ctx.clearRect(0, 0, W, H);
      trail = trail.filter((p) => t - p.t <= T.wake);

      if (top > 0.01) {
        if (still || now - roomAt > 300) { roomAt = now; measureRoom(); }
        const sh = still ? -1 : t - T.reveal * 0.35, gen = sh >= 0 ? Math.floor(sh / T.every) : -1;
        const cur = hidden(gen), old = hidden(gen - 1), rgen = Math.floor(t / T.randEvery);
        ctx.font = `350 ${size}px ${FONT}`; ctx.textBaseline = "middle"; ctx.textAlign = "left";
        for (const cell of cells) {
          cell.room = still ? +cell.blocked : clamp(cell.room + (cell.blocked ? 1 : -1) * dt / T.room);
          const on = !cur.has(cell.sec), was = !old.has(cell.sec);
          let v = on ? 1 : 0;
          if (gen >= 0 && on !== was) {
            const delay = hash(cell.i, gen, 561) * Math.min(0.42, T.every * 0.34) * 0.52;
            const dur = clamp(T.fade * (1 + (hash(cell.i, gen, 563) - 0.5) * 0.36), 0.04, T.every);
            v = (was ? 1 : 0) + ((on ? 1 : 0) - (was ? 1 : 0)) * smoother((sh - gen * T.every - delay) / dur);
          }
          const swapping = cell.swap && t >= cell.swap.at && t < cell.swap.until;
          if (cell.swap && t >= cell.swap.until) cell.swap = null;
          if (swapping) v = 1;
          const revealAt = 0.08 + (g.n > 1 ? cell.rank / (g.n - 1) : 0) * T.reveal * 0.76 + cell.local * T.reveal * 0.12;
          const a = smoother((t - revealAt) / T.fade) * v * (1 - smoother(cell.room)) * top;
          if (a <= 0.002) continue;
          const text = swapping ? cell.swap.word : WORD, x = cell.x + ((WORD.length - text.length) * step) / 2;
          const base = swapping ? rgb(pal.post, pal.glyph, smoother((t - cell.swap.at) / T.tint)) : rgb(pal.glyph);
          ctx.globalAlpha = a;
          let plain = spacing;
          const glyphs = [...text].map((ch, k) => {
            const id = cell.i * 16 + k, wk = trail.length || wakes.size ? wakeAt(id, x + k * step, cell.y, t, cell) : -1;
            if (wk >= 0) { plain = false; return [WAKE[Math.min(2, Math.floor(wk * 3))], rgb(pal.wakeA, pal.wakeB, wk)]; }
            if (hash(id, rgen, 500) < T.rand) { plain = false; return [POOL[Math.floor(hash(id, rgen, 502) * POOL.length)], base]; }
            return [ch, base];
          });
          if (plain) { ctx.letterSpacing = `${step - ctx.measureText("M").width}px`; ctx.fillStyle = base; ctx.fillText(text, x, cell.y); ctx.letterSpacing = "0px"; }
          else glyphs.forEach(([ch, color], k) => { ctx.fillStyle = color; ctx.fillText(ch, x + k * step, cell.y); });
        }
      }

      // Gutters: vertical runs of small glyphs outside the content column, denser toward the screen edge.
      const gw = Math.min(156, (W - Math.min(W, COLUMN)) / 2 - 30);
      if (top < 0.99 && gw >= 48) {
        const off = scrollY * 0.145, shift = Math.floor(off / 14), lift = off % 14, near = t - pointer.t < 0.5;
        ctx.font = `500 11px ${FONT}`; ctx.textBaseline = "middle"; ctx.textAlign = "center";
        for (let c = 0; c * 12 < gw; c++) {
          const fall = 1 - (c * 12) / gw, run = 3 + Math.floor(hash(c, 0, 9) * 9);
          for (let r = -1; r < H / 14 + 1; r++) {
            const wr = r - shift;
            if (hash(c, Math.floor(wr / run), 11) > 0.84 * fall * 0.45) continue;
            const amb = Math.floor(t * 1.85 + hash(c, wr, 13) * 10);
            const ch = GUTTER[Math.floor(hash(c, wr, hash(c, wr, amb + 50) < 0.215 ? amb : 17) * GUTTER.length)];
            const y = r * 14 + lift;
            for (const x of [6 + c * 12, W - 6 - c * 12]) {
              const hot = near ? clamp(1 - Math.hypot(x - pointer.x, y - pointer.y) / 82) * 0.8 : 0;
              ctx.globalAlpha = (1 - top) * (0.35 + 0.65 * fall);
              ctx.fillStyle = rgb(pal.gutter, pal.gutterWake, hot);
              ctx.fillText(ch, x, y);
            }
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e) => {
      const t = (performance.now() - start) / 1000;
      pointer.x = e.clientX; pointer.y = e.clientY; pointer.t = t;
      if (pointer.px === null) { pointer.px = e.clientX; pointer.py = e.clientY; pointer.pt = t; return; }
      const dx = e.clientX - pointer.px, dy = e.clientY - pointer.py, d = Math.hypot(dx, dy);
      if (d < 4) return;
      const sp = clamp(d / Math.max(0.008, t - pointer.pt) / 1300), steps = clamp(Math.ceil(d / 22), 1, 18);
      for (let k = 1; k <= steps; k++) trail.push({ x: pointer.px + (dx * k) / steps, y: pointer.py + (dy * k) / steps, t, dx: dx / d, dy: dy / d, sp });
      if (trail.length > 128) trail.splice(0, trail.length - 128);
      pointer.px = e.clientX; pointer.py = e.clientY; pointer.pt = t;
    };

    const loop = (now) => { frame = requestAnimationFrame(loop); if (!document.hidden) draw(now); };
    const redraw = () => draw(performance.now());
    const onResize = () => { resize(); redraw(); };

    resize(); redraw();
    addEventListener("resize", onResize);
    if (still) addEventListener("scroll", redraw, { passive: true });
    else { addEventListener("pointermove", onMove, { passive: true }); frame = requestAnimationFrame(loop); }
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", onResize); removeEventListener("scroll", redraw); removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
