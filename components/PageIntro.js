import React from "react";

export default function PageIntro({ eyebrow, title, children, aside }) {
  return <section className="site-container page-section border-b border-[#d8ddd8] dark:border-[#34413d]">
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
      <div><p className="eyebrow">{eyebrow}</p><h1 className="display-title">{title}</h1>{children && <div className="page-lede">{children}</div>}</div>
      {aside && <div className="border-l border-[#d8ddd8] pl-5 text-sm leading-6 text-[#5f6864] dark:border-[#34413d] dark:text-[#b7c0bb]">{aside}</div>}
    </div>
  </section>;
}
