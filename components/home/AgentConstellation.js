import { useEffect, useRef } from "react";

// ponytail: Canvas 2D with a hand-rolled perspective projection instead of Three.js;
// seven nodes and a few hundred particles do not need a WebGL scene graph.
export const AGENT_NODES = [
  { id: "reasoning", label: "Reasoning", note: "Plans, decomposes, decides", color: [34, 211, 238] },
  { id: "memory", label: "Memory", note: "Context that persists safely", color: [96, 165, 250] },
  { id: "tools", label: "Tools", note: "APIs, RPA, ERP, MCP", color: [139, 92, 246] },
  { id: "orchestration", label: "Orchestration", note: "Agents, workflows, handoffs", color: [34, 211, 238] },
  { id: "governance", label: "Governance", note: "Policy, approvals, audit", color: [167, 139, 250] },
  { id: "observability", label: "Observability", note: "Traces, evals, SLOs", color: [59, 130, 246] },
];

// Octahedron vertices: every capability sits one hop from the core and two from its opposite.
const POSITIONS = [[0, -1, 0], [1, 0, 0], [0, 0, 1], [-1, 0, 0], [0, 0, -1], [0, 1, 0]];
const EDGES = [
  ...POSITIONS.map((_, i) => [-1, i]),
  [0, 1], [0, 2], [0, 3], [0, 4], [5, 1], [5, 2], [5, 3], [5, 4], [1, 2], [2, 3], [3, 4], [4, 1],
];

export default function AgentConstellation({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, px: -1, py: -1, inside: false, speed: 0 };
    const rot = { yaw: 0.6, pitch: -0.35 };
    const stars = [];
    const trail = [];
    const signals = [];
    let projected = [];
    let hovered = -2;

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.round(Math.min(220, (w * h) / 6500));
      for (let i = 0; i < count; i++) stars.push({ x: Math.random(), y: Math.random(), z: Math.random() * 0.9 + 0.1, t: Math.random() * 6.28 });
    };

    const spawnSignal = (from) => {
      const options = EDGES.filter(([a, b]) => from === undefined || a === from || b === from);
      const [a, b] = options[Math.floor(Math.random() * options.length)];
      const flip = from !== undefined ? a !== from : Math.random() > 0.5;
      signals.push({ a: flip ? b : a, b: flip ? a : b, t: 0, v: 0.5 + Math.random() * 0.6 });
    };

    let sx = 1, sy = 1;
    const project = (v, cx, cy, radius) => {
      const cyw = Math.cos(rot.yaw), syw = Math.sin(rot.yaw), cp = Math.cos(rot.pitch), sp = Math.sin(rot.pitch);
      const x1 = v[0] * cyw - v[2] * syw, z1 = v[0] * syw + v[2] * cyw;
      const y2 = v[1] * cp - z1 * sp, z2 = v[1] * sp + z1 * cp;
      const s = 3.2 / (3.2 + z2);
      return { x: cx + x1 * radius * s * sx, y: cy + y2 * radius * s * sy, s, z: z2 };
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      pointer.speed *= 0.92;
      if (!reduced) {
        rot.yaw += dt * 0.12 + (pointer.x - 0.5) * dt * 0.9;
        rot.pitch += ((pointer.y - 0.5) * 0.9 - 0.35 - rot.pitch) * 0.03;
      }

      const mobile = w < 768;
      // Desktop: a wide ellipse so capabilities orbit around the headline instead of through it.
      const cx = w / 2 + (pointer.x - 0.5) * 30, cy = (mobile ? h - 150 : h * 0.52) + (pointer.y - 0.5) * 20;
      const radius = mobile ? Math.min(w * 0.3, 105) : Math.min(h * 0.36, w * 0.24);
      sx = mobile ? 1 : 1.9; sy = mobile ? 1 : 1.05;
      const calm = (x, y) => (mobile ? 1 : Math.min(1, Math.max(0.12, (Math.abs(x - w / 2) - w * 0.2) / (w * 0.12))));
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const x = ((s.x * w - (pointer.x - 0.5) * 60 * s.z) % w + w) % w;
        const y = ((s.y * h - (pointer.y - 0.5) * 40 * s.z) % h + h) % h;
        const a = 0.18 + 0.32 * s.z * (reduced ? 1 : 0.6 + 0.4 * Math.sin(now / 900 + s.t));
        ctx.fillStyle = `rgba(165,200,255,${a})`;
        ctx.fillRect(x, y, s.z * 1.6, s.z * 1.6);
      }

      const core = project([0, 0, 0], cx, cy, radius);
      projected = POSITIONS.map((p) => project(p, cx, cy, radius));
      const at = (i) => (i === -1 ? core : projected[i]);

      // Hover = nearest node to the real cursor within reach; it becomes the signal source.
      hovered = -2;
      if (pointer.inside) {
        let best = 60;
        [core, ...projected].forEach((p, i) => {
          const d = Math.hypot(p.x - pointer.px, p.y - pointer.py);
          if (d < best) { best = d; hovered = i - 1; }
        });
      }

      ctx.lineWidth = 1;
      for (const [a, b] of EDGES) {
        const p = at(a), q = at(b);
        const lit = hovered !== -2 && (a === hovered || b === hovered);
        const g = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
        const base = lit ? 0.55 : 0.14 + 0.08 * ((p.s + q.s) / 2 - 0.7);
        g.addColorStop(0, `rgba(34,211,238,${base})`);
        g.addColorStop(1, `rgba(139,92,246,${base})`);
        ctx.strokeStyle = g;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
      }

      if (!reduced) {
        const rate = 1.2 + pointer.speed * 0.25;
        if (Math.random() < rate * dt) spawnSignal(hovered !== -2 ? hovered : undefined);
        if (hovered !== -2 && Math.random() < 2.5 * dt) spawnSignal(hovered);
      }
      ctx.globalCompositeOperation = "lighter";
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += dt * s.v;
        if (s.t >= 1) { signals.splice(i, 1); continue; }
        const p = at(s.a), q = at(s.b);
        const x = p.x + (q.x - p.x) * s.t, y = p.y + (q.y - p.y) * s.t;
        const r = 10 * (p.s + (q.s - p.s) * s.t);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, "rgba(220,250,255,.95)");
        g.addColorStop(0.3, "rgba(34,211,238,.55)");
        g.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      }

      const order = [-1, ...POSITIONS.map((_, i) => i)].sort((a, b) => at(b).z - at(a).z);
      for (const i of order) {
        const p = at(i);
        const [r, g, b] = i === -1 ? [226, 232, 255] : AGENT_NODES[i].color;
        const lit = hovered === i;
        const size = (i === -1 ? 9 : 6) * p.s * (lit ? 1.5 : 1);
        const k = lit ? 1 : 0.35 + 0.65 * calm(p.x, p.y);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 7);
        glow.addColorStop(0, `rgba(${r},${g},${b},${lit ? 0.6 : 0.32 * k})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(p.x, p.y, size * 7, 0, 6.283); ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},${k})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, 6.283); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      ctx.textAlign = "center";
      projected.forEach((p, i) => {
        const lit = hovered === i;
        ctx.font = `${lit ? 600 : 500} ${mobile ? 10 : 11}px var(--font-geist-mono, ui-monospace), monospace`;
        ctx.fillStyle = `rgba(214,236,255,${lit ? 0.95 : (0.35 + 0.35 * (p.s - 0.75)) * calm(p.x, p.y)})`;
        ctx.fillText(AGENT_NODES[i].label.toUpperCase(), p.x, p.y + 22 * p.s);
        if (lit && !mobile) {
          ctx.fillStyle = "rgba(148,190,230,.85)";
          ctx.font = "12px var(--font-geist, ui-sans-serif), sans-serif";
          ctx.fillText(AGENT_NODES[i].note, p.x, p.y + 38 * p.s);
        }
      });

      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.life -= dt * 1.4;
        if (t.life <= 0) { trail.splice(i, 1); continue; }
        t.x += t.vx * dt; t.y += t.vy * dt; t.vx *= 0.96; t.vy *= 0.96;
        ctx.fillStyle = `rgba(${t.c},${t.life * 0.8})`;
        ctx.beginPath(); ctx.arc(t.x, t.y, 1.6 + t.life * 1.6, 0, 6.283); ctx.fill();
      }

      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      pointer.inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (!pointer.inside) return;
      if (pointer.px >= 0) pointer.speed = Math.min(40, pointer.speed + Math.hypot(x - pointer.px, y - pointer.py) * 0.08);
      pointer.px = x; pointer.py = y;
      pointer.tx = x / r.width; pointer.ty = y / r.height;
      if (!reduced && e.pointerType === "mouse" && trail.length < 140) {
        const c = Math.random() > 0.5 ? "34,211,238" : "167,139,250";
        trail.push({ x, y, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30, life: 1, c });
      }
    };
    const onLeave = () => { pointer.inside = false; pointer.tx = 0.5; pointer.ty = 0.5; };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduced) frame(performance.now()); });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      cancelAnimationFrame(raf);
      if (visible && !reduced) { last = performance.now(); raf = requestAnimationFrame(frame); }
    });
    io.observe(canvas);
    const onVisibility = () => { visible = !document.hidden; cancelAnimationFrame(raf); if (visible && !reduced) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    document.addEventListener("visibilitychange", onVisibility);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    frame(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
