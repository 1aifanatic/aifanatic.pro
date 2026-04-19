import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FontSwitcher from "./FontSwitcher";
import SideNav from "./SideNav";

export default function ContainerBlock({ children, ...customMeta }) {
  const router = useRouter();
  const isHome = router.asPath === "/";
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [router.asPath]);

  const meta = {
    title:
      "Naveen Chatlapalli - Manager of Solution Architecture, UiPath Community Leader, Gen AI Engineer",
    description: `Welcome to my personal web site to learn more about me, my activities, and my past work.`,
    image: "/avatar.png",
    type: "website",
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://naveen.aifanatic.pro${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://naveen.aifanatic.pro${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Naveen Chatlapalli" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1aifanatic" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <main className="dark:bg-gray-800 w-full">
        {isHome ? (
          <Navbar />
        ) : (
          <>
            <SideNav
              isCollapsed={isNavCollapsed}
              isMobileOpen={isMobileNavOpen}
              onToggleCollapse={() => setIsNavCollapsed((prev) => !prev)}
              onMobileToggle={() => setIsMobileNavOpen((prev) => !prev)}
              onMobileClose={() => setIsMobileNavOpen(false)}
            />
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className={`fixed left-4 top-4 z-40 items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 lg:hidden ${
                isMobileNavOpen ? "hidden" : "inline-flex"
              }`}
              aria-label="Open navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              Menu
            </button>
          </>
        )}
        <div
          className={`min-h-screen transition-all ${
            isHome ? "" : isNavCollapsed ? "lg:pl-24" : "lg:pl-64"
          }`}
        >
          {children}
        </div>
        <FontSwitcher />
        <Footer />
      </main>
    </div>
  );
}

