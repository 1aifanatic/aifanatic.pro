import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import userData from "@constants/data";

const links = [
  { href: "/work", label: "Work" },
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

  return <header className="sticky top-0 z-50 border-b border-[#d8ddd8]/80 bg-[#f8f7f3]/95 backdrop-blur dark:border-[#34413d] dark:bg-[#111716]/95">
    <div className="site-container flex min-h-[76px] items-center justify-between gap-5">
      <Link href="/" className="shrink-0 leading-tight">
        <span className="block font-serif text-lg font-semibold tracking-[-0.03em]">{userData.name}</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5f6864] dark:text-[#b7c0bb]">AI &amp; solution architecture</span>
      </Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>)}
      </nav>
      <div className="flex items-center gap-2">
        <a href={`mailto:${userData.email}`} className="hidden text-sm font-semibold text-[#174b8b] hover:text-[#0d376b] sm:inline">Contact</a>
        <button aria-label="Toggle dark mode" type="button" className="grid h-9 w-9 place-items-center rounded-full border border-[#d8ddd8] text-[#46514c] transition hover:border-[#174b8b] hover:text-[#174b8b] dark:border-[#46514c] dark:text-[#c5cec8]" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{ready && (theme === "dark" ? "☼" : "◐")}</button>
        <button type="button" className="grid h-9 w-9 place-items-center rounded-full border border-[#d8ddd8] text-lg lg:hidden dark:border-[#46514c]" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>☰</button>
      </div>
    </div>
    {open && <nav className="site-container flex flex-col gap-1 border-t border-[#d8ddd8] py-4 lg:hidden dark:border-[#34413d]" aria-label="Mobile navigation">
      {links.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>)}
      <a href={`mailto:${userData.email}`} className="px-3 py-2 text-sm font-semibold text-[#174b8b] dark:text-[#a8c7ee]">Contact</a>
    </nav>}
  </header>;
}
