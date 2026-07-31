import { Html, Head, Main, NextScript } from "next/document";
import { getWebmcpPayload } from "../lib/getWebmcpPayload";

export default function MyDocument() {
  const payloadJson = JSON.stringify(getWebmcpPayload()).replace(/</g, "\\u003c");

  return (
      <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#174b8b" />
      </Head>
      <body>
        <script
          id="__WEBMCP_PAYLOAD__"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: payloadJson }}
        />
        <script src="/webmcp-register.js" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
