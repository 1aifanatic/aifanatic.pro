import React from "react";
import Link from "next/link";
import userData from "@constants/data";

export default function Footer() {
  return <footer className="border-t border-[#d8ddd8] dark:border-[#34413d]">
    <div className="site-container flex flex-col gap-8 py-10 text-sm text-[#5f6864] dark:text-[#b7c0bb] sm:flex-row sm:items-end sm:justify-between">
      <div><p className="font-serif text-xl text-[#18211f] dark:text-[#eef1ed]">{userData.name}</p><p className="mt-2 max-w-md leading-6">Solution architecture for enterprise automation and trustworthy AI-agent systems.</p><p className="mt-3 max-w-md text-xs leading-5">Key claims are supported by public sources and downloadable materials.</p></div>
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 font-medium" aria-label="Footer navigation"><Link className="flex min-h-[44px] items-center" href="/work">Work</Link><Link className="flex min-h-[44px] items-center" href="/recognition">Recognition</Link><Link className="flex min-h-[44px] items-center" href="/insights">Insights</Link><a className="flex min-h-[44px] items-center" href={userData.newsletter.url} target="_blank" rel="noopener noreferrer">Substack</a><a className="flex min-h-[44px] items-center" href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a className="flex min-h-[44px] items-center" href={`mailto:${userData.email}`}>Email</a></nav>
    </div>
    <div className="site-container border-t border-[#d8ddd8] py-5 text-xs text-[#7a847e] dark:border-[#34413d] dark:text-[#96a09a]">© {new Date().getFullYear()} Naveen Chatlapalli. All rights reserved.</div>
  </footer>;
}
