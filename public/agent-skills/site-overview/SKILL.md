---
name: site-overview
description: Navigate aifanatic.pro and discover public HTTP APIs plus contact metadata.
---

# Site overview (aifanatic.pro)

Use this skill when you need the same information a human would get from the homepage navigation, without scraping HTML.

## Canonical entry points

- Human-readable home: `/`
- Blog index: `/blog`
- Contact: `/contact`

## APIs

- OpenAPI document: `/openapi.json`
- RFC 9727 API catalog: `/.well-known/api-catalog`

## Operator access

`/api/leads` is documented in OpenAPI and requires a pre-provisioned Bearer credential (`ADMIN_SECRET_KEY`). There is no public programmatic OAuth grant on this deployment; `/.well-known/oauth-protected-resource` describes the protected resource metadata.
