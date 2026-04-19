import { getSiteBaseUrl } from "@lib/siteUrl";

function linksetBody(base) {
  const catalog = `${base}/.well-known/api-catalog`;
  const openapi = `${base}/openapi.json`;
  return {
    linkset: [
      {
        anchor: catalog,
        item: [
          { href: `${base}/api/hello` },
          { href: `${base}/api/leads` },
          { href: `${base}/api/download` },
        ],
      },
      {
        anchor: `${base}/api/hello`,
        "service-desc": [
          {
            href: openapi,
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [{ href: `${base}/contact`, type: "text/html" }],
        status: [{ href: `${base}/api/hello`, type: "application/json" }],
      },
      {
        anchor: `${base}/api/leads`,
        "service-desc": [
          {
            href: openapi,
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [{ href: `${base}/contact`, type: "text/html" }],
        status: [{ href: `${base}/api/hello`, type: "application/json" }],
      },
      {
        anchor: `${base}/api/download`,
        "service-desc": [
          {
            href: openapi,
            type: "application/vnd.oai.openapi+json",
          },
        ],
        "service-doc": [{ href: `${base}/downloads`, type: "text/html" }],
        status: [{ href: `${base}/api/hello`, type: "application/json" }],
      },
    ],
  };
}

export default function handler(req, res) {
  const base = getSiteBaseUrl(req);
  const profile = "https://www.rfc-editor.org/info/rfc9727";
  const ct = `application/linkset+json; profile="${profile}"`;
  const link = `<${base}/.well-known/api-catalog>; rel="api-catalog"`;

  if (req.method === "HEAD") {
    res.setHeader("Content-Type", ct);
    res.setHeader("Link", link);
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  res.setHeader("Content-Type", ct);
  res.setHeader("Link", link);
  return res.status(200).send(JSON.stringify(linksetBody(base)));
}
