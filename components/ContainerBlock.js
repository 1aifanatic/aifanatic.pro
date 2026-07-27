import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter();
  const meta = {
    title: "Naveen Chatlapalli — AI & Solution Architecture",
    description: "Portfolio of Naveen Chatlapalli, an AI product and solution architecture leader.",
    image: "/avatar.png",
    type: "website",
    ...customMeta,
  };
  return <div className="site-surface">
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={meta.description} />
      <meta property="og:url" content={`https://naveen.aifanatic.pro${router.asPath}`} />
      <link rel="canonical" href={`https://naveen.aifanatic.pro${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Naveen Chatlapalli" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {meta.date && <meta property="article:published_time" content={meta.date} />}
    </Head>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>;
}
