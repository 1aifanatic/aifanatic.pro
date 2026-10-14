import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
      <div className={`${geist.variable} ${geistMono.variable}`}>
        <Component {...pageProps} />
      </div>
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;
