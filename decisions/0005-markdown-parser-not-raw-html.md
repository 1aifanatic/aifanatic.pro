# Render Skills with a markdown parser, not the blog's raw-HTML pattern

Skill Pages parse `SKILL.md` at build time with `marked` + `gray-matter` and render the result through the existing `.article-copy` styling. This deliberately does not follow the precedent set by the blog, which stores hand-authored HTML strings in `constants/data.js` and injects them with `dangerouslySetInnerHTML` — a reasonable reader would assume we would reuse that, so the deviation is recorded here.

The blog's pattern is safe only because a human wrote every byte. Skill content arrives by automated Sync and is dense in exactly the things a hand-rolled regex converter mangles: fenced code blocks, angle brackets, and YAML. Both dependencies run only inside `getStaticProps`, so the runtime bundle cost is zero, and reusing `.article-copy` is what makes these pages read as though they were always part of the site.

## Consequences

Output is sanitised even though the content is our own, because the Sync is automated. Supplementary Files are named and linked to the Upstream Repository rather than rendered as pages of their own — rendering every referenced file would multiply the Sync surface and page count for content most readers never open, while hiding them would make a Skill Page look truncated.
