import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import userData from "@constants/data";
import Icon from "./Icon";

const links = [
  { href: "/open-source", label: "Open Source" },
  { href: "/daily-ai-drop", label: "AI Drop" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/recognition", label: "Recognition" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export default function Navbar({ immersive = false }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setReady(true), []);
  useEffect(() => setOpen(false), [router.asPath]);
  const isActive = (href) => router.asPath === href || router.asPath.startsWith(`${href}/`);
  const linkClass = (href) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive(href) ? "bg-[#e9eff8] text-[#174b8b] dark:bg-white/10 dark:text-white" : "text-[#46514c] hover:text-[#174b8b] dark:text-slate-300 dark:hover:text-white"}`;
  const dark = ready && theme === "dark";

  // Floating glass pill; the immersive homepage is always dark, so its theme toggle is hidden there.
  return <header className={`sticky top-3 z-50 px-3 ${immersive ? "-mb-[60px]" : ""}`}>
    <div className="mx-auto flex min-h-[60px] max-w-7xl items-center justify-between gap-3 rounded-full border border-[#d8ddd8]/80 bg-[#f8f7f3]/80 py-2 pl-5 pr-2 shadow-[0_10px_40px_rgba(0,0,0,.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1e]/60 dark:shadow-[0_10px_40px_rgba(0,0,0,.4)]">
      <Link href="/" className="min-w-0 leading-tight">
        <span className="block text-[15px] font-semibold tracking-[-0.02em]">{userData.name}</span>
        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5f6864] dark:text-cyan-200/70">Agentic AI Architect</span>
      </Link>
      <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>)}
      </nav>
      <div className="flex shrink-0 items-center gap-2">
        <Link href="/contact" className="hidden min-h-[44px] items-center gap-2 rounded-full bg-[#18211f] px-4 text-sm font-semibold text-white transition hover:bg-[#174b8b] dark:bg-cyan-300 dark:text-[#020617] dark:hover:bg-cyan-200 sm:inline-flex">Contact <Icon name="arrowRight" /></Link>
        {!immersive && <button aria-label={dark ? "Use light mode" : "Use dark mode"} title={dark ? "Use light mode" : "Use dark mode"} type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[#d8ddd8] text-[#46514c] transition hover:border-[#174b8b] hover:text-[#174b8b] dark:border-white/15 dark:text-slate-300 dark:hover:border-cyan-300 dark:hover:text-cyan-200" onClick={() => setTheme(dark ? "light" : "dark")}>{ready && <Icon name={dark ? "sun" : "moon"} className="h-[18px] w-[18px]" />}</button>}
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-[#d8ddd8] xl:hidden dark:border-white/15" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}><Icon name={open ? "close" : "menu"} className="h-5 w-5" /></button>
      </div>
    </div>
    {open && <nav className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-[1.75rem] border border-[#d8ddd8] bg-[#f8f7f3]/95 p-4 shadow-lg backdrop-blur-xl xl:hidden dark:border-white/10 dark:bg-[#0a0f1e]/90" aria-label="Mobile navigation">
      {links.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>)}
      <Link href="/contact" className="flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold text-[#174b8b] dark:text-cyan-200">Contact</Link>
    </nav>}
  </header>;
}
