# Project documentation lives outside `docs/`

ADRs live in `decisions/` at the repository root, and the glossary lives in `CONTEXT.md`, also at the root. Neither goes in `docs/`.

`docs/` looks like a documentation directory but is not one: it is a GitHub Pages publish root holding `CNAME` (`aifanatic.pro`), a `noindex` `index.html`, and a `404.html` that together implement the path-preserving apex redirect to `naveen.aifanatic.pro`. Anything placed in `docs/` is served publicly from the apex domain. A future agent following the common `docs/adr/` convention would silently publish internal decision records to the web.

## Consequences

`CONTEXT.md` at the root also matches the convention of `mattpocock/skills`, the project this Catalog's structure was inspired by. `AGENTS.md` carries a note warning that `docs/` is a publish directory, since the ADR alone will not be read before the mistake is made.
