import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import userData from "@constants/data";
import Icon from "./Icon";

const links = [
  { href: "/work", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/recognition", label: "Recognition" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setReady(true), []);
  useEffect(() => setOpen(false), [router.asPath]);
  const isActive = (href) => router.asPath === href || router.asPath.startsWith(`${href}/`);
  const linkClass = (href) => `rounded-full px-3 py-2 text-sm font-medium transition ${isActive(href) ? "bg-[#e9eff8] text-[#174b8b] dark:bg-[#203a5a] dark:text-white" : "text-[#46514c] hover:text-[#174b8b] dark:text-[#c5cec8] dark:hover:text-white"}`;
  const dark = theme === "dark";

  return <header className="sticky top-0 z-50 border-b border-[#d8ddd8]/80 bg-[#f8f7f3]/95 backdrop-blur dark:border-[#34413d] dark:bg-[#111716]/95">
    <div className="site-container flex min-h-[64px] items-center justify-between gap-5">
      <Link href="/" className="shrink-0 leading-tight">
        <span className="block font-serif text-lg font-semibold tracking-[-0.03em]">{userData.name}</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5f6864] dark:text-[#b7c0bb]">Solution Architecture · AI Agents</span>
      </Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <Link href="/contact" className="button-primary hidden px-4 py-2.5 sm:inline-flex">Contact <Icon name="arrowRight" /></Link>
        <button aria-label={dark ? "Use light mode" : "Use dark mode"} title={dark ? "Use light mode" : "Use dark mode"} type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[#d8ddd8] text-[#46514c] transition hover:border-[#174b8b] hover:text-[#174b8b] dark:border-[#46514c] dark:text-[#c5cec8]" onClick={() => setTheme(dark ? "light" : "dark")}>{ready && <Icon name={dark ? "sun" : "moon"} className="h-[18px] w-[18px]" />}</button>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-[#d8ddd8] lg:hidden dark:border-[#46514c]" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}><Icon name={open ? "close" : "menu"} className="h-5 w-5" /></button>
      </div>
    </div>
    {open && <nav className="site-container flex flex-col gap-1 border-t border-[#d8ddd8] bg-[#f8f7f3] py-4 shadow-lg lg:hidden dark:border-[#34413d] dark:bg-[#111716]" aria-label="Mobile navigation">
      {links.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>)}
      <Link href="/contact" className="flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">Contact</Link>
    </nav>}
  </header>;
}
