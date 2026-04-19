# Portfolio Upgrade Instructions (Organic + Proof-Driven)

# Constraints: KEEP animation + KEEP photograph (no changes to either)

Non-negotiables:

- ✅ Do NOT change the homepage animation (background motion / hero animation stays exactly as-is).
- ✅ Do NOT change your photograph/avatar (same image; same placement is fine).
- ✅ You MAY update homepage text, buttons, and add sections BELOW the hero, as long as layout/animation/photo aren’t disturbed.
- ✅ Do NOT mention immigration, visas, or any criteria language anywhere on the site.

Goal (public-facing):
Make the portfolio feel natural and professional, but **proof-first**: every major claim has a verifier link and/or downloadable artifact.

---

## 1) NAVIGATION (ADD PAGES, KEEP IT CLEAN)

Keep your current nav, but expand it with normal, organic labels.

Recommended nav:
Home | Work | Writing | Speaking | Judging | Press | Downloads | Contact

New pages/routes to create:

- /work
- /writing
- /speaking
- /judging
- /press
- /downloads

If you want minimal nav:
Home | Work | Writing | Downloads | Contact  
(and link Speaking/Judging/Press from footer)

---

## 2) HOMEPAGE (SAFE EDITS ONLY: TEXT + CTA + PROOF STRIP)

Keep animation + photo untouched.

### 2.1 Update hero text (do not move photo)

Headline (example):
Manager of Solution Architecture building enterprise-grade automation and AI agent systems.

Subheadline (example):
Manager of Solution Architecture (Ashling Partners) • UiPath MVP • Community Leader • Awards Judge

### 2.2 Add two buttons (no layout disruption)

Primary CTA: “View Work” → /work  
Secondary CTA: “Get the Highlights Deck” → /downloads

### 2.3 Add a “Proof Strip” just below hero (text-only)

This is a row of 3–5 chips/badges linking to deeper pages. Keep styling simple.

Suggested chips:

- Awards Judge (2024)
- UiPath MVP (2x)
- Top 7 Winner — Specialist Coded Agent Challenge
- UiPath Dallas Chapter Lead
- Published Author (Ashling / UiPath Community)

Each chip links to the relevant section:

- Awards Judge → /judging
- Top 7 Winner → /work#risk-orbit
- Writing → /writing

### 2.4 Replace “Recent Highlights” behavior (keep it but restructure)

Homepage should show only 3–5 “Featured” items max.
Move the full list to /writing.

Homepage featured card format:

- Title
- Where it appeared (Ashling / UiPath Community / YouTube)
- Date
- Link

---

## 3) CREATE /work (YOUR MAIN IMPACT PAGE)

This becomes the primary destination for “real work” evidence.

### 3.1 Work page structure

Title:
Selected Work

Short intro:
A curated set of projects, write-ups, and systems I’ve led or architected. Each entry includes context, what I did, and supporting links.

### 3.2 Project card format (repeat for each)

Each project must include:

- Problem (1–2 lines)
- Your role (1 line)
- What you built (3–6 bullets, architecture level)
- Results (numbers only)
- Proof links (public links)
- Artifacts (downloads hosted on your domain)

Project card template:
**[Project Name]**  
Problem: …  
Role: …  
Built:

- …  
  Results:
- …  
  Links: [Demo] [Repo] [Article]  
  Artifacts: [PDF] [Diagram] [Slides]

### 3.3 Publish this first project (high leverage)

Risk Orbit section:

- Include the public Ashling article link:
  https://ashling.ai/resources/risk-orbit-uipath-coded-agents-meet-real-world-supply-chain-risk
- Include repo + demo video if publicly shareable.
- Include diagram as a hosted image (not just external).

Optional supporting link (members-only; keep as secondary):
https://forum.uipath.com/t/risk-orbit-uipath-coded-agent-with-langchain-mcp-context-grounding-uipath-sdk-supported/5676124

Hard rule:
If “Results” are stated (e.g., 80–90% time saved), add a small “How measured” note or a downloadable one-pager with the calculation.

---

## 4) CREATE /judging (SIMPLE, PROFESSIONAL, VERIFIABLE)

Title:
Judging & Reviews

Include:

- Program name
- Year
- Role (Judge / Panelist)
- Verification link
- Optional: downloadable confirmation letter/email (redacted)

Add this item:
Globee Awards — Judge (2024)
Verification link:
https://globeeawards.com/2024-business-awards-judge/

---

## 5) CREATE /writing (TURN “RECENT HIGHLIGHTS” INTO A REAL BIBLIOGRAPHY)

Title:
Writing

For each entry show:

- Title
- Publisher/Platform
- Date
- Link
- Optional metrics (views/likes if available)

Group by platform:

- Ashling
- UiPath Community
- Medium
- YouTube (if it’s your content)

Homepage should only show featured 3–5.

---

## 6) CREATE /speaking (SPEAKER CREDIBILITY, ORGANIC)

Title:
Speaking

Include:

- Speaker profile link
- Sessions delivered (title + event + date)
- Slides
- Recordings
- Event page links

Add your Sessionize link prominently:
https://sessionize.com/aifanatic/

---

## 7) CREATE /press (CLEAN PLACEHOLDER THAT LOOKS NORMAL)

Title:
Press & Mentions

Sections:

- Features (external articles)
- Mentions (newsletters, podcasts)
- Company announcements (if public)

If currently empty:
Add a simple line:
“For press inquiries: naveen@aifanatic.pro”
And a “Media Kit” link → /downloads

---

## 8) CREATE /downloads (PUBLIC-FRIENDLY PACKETS)

Title:
Downloads

Host PDFs on your own domain.

Add:

- Highlights Deck (PDF)
- One-Page Bio (PDF)
- Case Study PDFs (start with Risk Orbit)
- Selected Slides (PDF)
- Media Kit zip (optional)

Avoid Google Drive links if possible.

---

## 9) BIO PAGE EDITS (KEEP IT SHORT, MOVE PROOF OUT)

Keep /bio, but tighten it:

- Reduce long career narrative.
- Keep 2–3 lines on education.
- Add 3 links at the top:
  - View Work → /work
  - Writing → /writing
  - Downloads → /downloads

Move “awards/judging” detail out of bio into /judging and /work.

---

## 10) FOOTER TRUST LINE (SUBTLE, NOT IMMIGRATION-SCENTED)

Add a single footer line sitewide:
“Key claims are supported by public links and downloadable materials.”

---

## 11) SEO/TRUST (SAFE TECH CHANGES; NO ANIMATION TOUCH)

Add OpenGraph + Twitter cards (does not affect animation/photo).

Add JSON-LD Person schema (edit links):

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Naveen Chatlapalli",
  "jobTitle": "Manager of Solution Architecture",
  "url": "https://naveen.aifanatic.pro/",
  "sameAs": [
    "https://sessionize.com/aifanatic/",
    "https://www.linkedin.com/in/<YOUR-LINKEDIN>/",
    "https://github.com/<YOUR-GITHUB>/",
    "https://twitter.com/<YOUR-TWITTER>/"
  ]
}
</script>

---

## 12) OPTIONAL: DATA MODEL FOR CONSISTENT “PROOF CARDS”

Create `proof.json` and render cards on /work and /judging.

[
{
"type": "Judging",
"title": "Globee Awards — Judge (2024)",
"summary": "Selected as a judge for Globee Business Awards.",
"links": [
{
"label": "Official judges list",
"url": "https://globeeawards.com/2024-business-awards-judge/"
}
],
"artifacts": [
"/artifacts/globee-confirmation.pdf"
]
},
{
"type": "Recognition",
"title": "Risk Orbit — Top 7 Winner (Specialist Coded Agent Challenge)",
"summary": "Multi-agent supply chain risk intelligence system recognized as a Top 7 winner.",
"links": [
{
"label": "Ashling article",
"url": "https://ashling.ai/resources/risk-orbit-uipath-coded-agents-meet-real-world-supply-chain-risk"
}
],
"artifacts": [
"/artifacts/risk-orbit-case-study.pdf",
"/artifacts/risk-orbit-architecture.png"
]
}
]

Rule:
If an item has no public link and no artifact, it doesn’t get listed.

---

## 13) EXECUTION ORDER (FASTEST IMPACT WITHOUT TOUCHING ANIMATION/PHOTO)

Day 1:

- Add /work with Risk Orbit case study + proof links
- Add /judging with Globee listing + proof link
- Add homepage CTA buttons (Work / Downloads)
- Add Proof Strip chips below hero

Day 2:

- Add /writing and move full highlights list there
- Add /downloads with a “Highlights Deck” placeholder PDF

Week 2–4:

- Add 2–4 more work entries (only if you can attach proof)
- Add /speaking with Sessionize + any recordings
- Add /press page + media kit

---

## HARD RULES (FOR A HIGH-TRUST PORTFOLIO)

- No unverifiable claims.
- If you mention an award/judging/recognition: provide a public link or a downloadable artifact.
- Keep homepage minimal: identity + proof chips + CTAs.
- Keep animation + photo unchanged.

