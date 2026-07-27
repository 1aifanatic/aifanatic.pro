import { Html, Head, Main, NextScript } from "next/document";
import { getWebmcpPayload } from "../lib/getWebmcpPayload";

export default function MyDocument() {
  const payloadJson = JSON.stringify(getWebmcpPayload()).replace(/</g, "\\u003c");

  return (
      <Html lang="en" data-scroll-behavior="smooth">
      <Head />
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
