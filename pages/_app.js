import "../styles/globals.css";
import { useEffect } from "react";
import { Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

// Self-hosted display serif. Without it, headlines fell back to Times New Roman on Windows and Georgia elsewhere.
const display = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"], display: "swap" });

// Buttons lean a few pixels toward the cursor. One delegated listener; the pull lives in two CSS variables.
function useMagneticButtons() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let active = null;
    const release = () => { active?.style.removeProperty("--mx"); active?.style.removeProperty("--my"); active = null; };
    const pull = (d, max) => Math.max(-max, Math.min(max, d * 0.2));
    const move = (e) => {
      const b = e.target.closest?.(".button-primary, .button-secondary");
      if (b !== active) release();
      if (!b || b.disabled) return;
      active = b;
      // The rect already includes the current pull; subtract it so the pull never feeds back on itself.
      const r = b.getBoundingClientRect(), t = getComputedStyle(b).translate;
      const [tx = 0, ty = 0] = t === "none" ? [] : t.split(" ").map(parseFloat);
      b.style.setProperty("--mx", `${pull(e.clientX - (r.left + r.width / 2 - tx), 6)}px`);
      b.style.setProperty("--my", `${pull(e.clientY - (r.top + r.height / 2 - ty), 4)}px`);
    };
    const out = (e) => { if (active && !active.contains(e.relatedTarget)) release(); };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", out);
    return () => { release(); document.removeEventListener("pointermove", move); document.removeEventListener("pointerout", out); };
  }, []);
}

function MyApp({ Component, pageProps }) {
  useMagneticButtons();
  return (
    <ThemeProvider defaultTheme="light" enableSystem={false} attribute="class">
      <style jsx global>{`:root { --font-display: ${display.style.fontFamily}, Georgia, serif; }`}</style>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;
