import React from "react";
import Link from "next/link";
import ContainerBlock from "@components/ContainerBlock";

export default function Custom404() { return <ContainerBlock title="Page not found - Naveen Chatlapalli"><section className="site-container page-section py-28 sm:py-36"><p className="eyebrow">404</p><h1 className="display-title">This page has moved or no longer exists.</h1><p className="page-lede">Try the portfolio home, selected work, or the insights archive.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/" className="button-primary">Go home →</Link><Link href="/work" className="button-secondary">Selected work</Link></div></section></ContainerBlock>; }
