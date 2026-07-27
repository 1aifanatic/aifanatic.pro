import React from "react";
import Link from "next/link";
import userData from "@constants/data";

export default function Footer() {
  return <footer className="border-t border-[#d8ddd8] dark:border-[#34413d]">
    <div className="site-container flex flex-col gap-6 py-10 text-sm text-[#5f6864] dark:text-[#b7c0bb] sm:flex-row sm:items-end sm:justify-between">
      <div><p className="font-serif text-xl text-[#18211f] dark:text-[#eef1ed]">{userData.name}</p><p className="mt-2 max-w-md leading-6">Building practical AI systems and sharing what makes them useful.</p></div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-medium"><Link href="/work">Work</Link><Link href="/recognition">Recognition</Link><Link href="/insights">Insights</Link><a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={`mailto:${userData.email}`}>Email</a></div>
    </div>
    <div className="site-container border-t border-[#d8ddd8] py-5 text-xs text-[#7a847e] dark:border-[#34413d] dark:text-[#96a09a]">© {new Date().getFullYear()} Naveen Chatlapalli. All rights reserved.</div>
  </footer>;
}
