# Personal Site Legal, Role, SEO, and Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish accurate role/entity data, personal legal pages, consent-gated Google Analytics, and one restrained Kernscale conversion section on Jonas Knüppel’s personal site.

**Architecture:** Keep the homepage content model in `app/content.ts`, add two static App Router legal routes sharing one CSS module, and move GA from unconditional root scripts into a small client-side basic-consent controller. Keep metadata and structured data server-rendered in the root layout.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Playwright, ESLint.

## Global Constraints

- The site operator is Jonas Knüppel, Greifstraße 22, 17034 Neubrandenburg, Deutschland; contact is `info@jonasknppel.me`.
- The public role is “co-founder & managing director / CTO at Kernscale.”
- Add exactly one new Kernscale section with exactly three bullet points.
- Google Analytics must not load or make a request before explicit analytics consent.
- Do not claim legal compliance or invent registration, tax, telephone, hosting-provider, or retention facts.
- Kernscale’s separate website is outside this repository.
- Preserve unrelated user files and do not run broad validation.

---

### Task 1: Homepage role, Kernscale section, and conversion links

**Files:**
- Modify: `app/content.ts`
- Modify: `app/page.tsx`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: existing `heroContent`, `heroPlainText`, and `heroContent.links` rendering.
- Produces: synchronized visible/plain-text role content and homepage links to Kernscale, email, Impressum, and Datenschutz.

- [ ] **Step 1: Add failing homepage assertions**

Add Playwright assertions for `co-founder`, `managing director`, `CTO at Kernscale`, the three Kernscale bullets, `mailto:info@jonasknppel.me`, `/impressum/`, and `/datenschutz/`.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "business identity" --reporter=line`

Expected: FAIL because the confirmed role and legal/contact links are absent.

- [ ] **Step 3: Update the content model and link rendering**

Set the metadata line to:

```ts
"born: neubrandenburg / raised: germany / currently: co-founder & managing director / CTO at kernscale"
```

Add one section with these items:

```ts
{
  title: "at kernscale i",
  items: [
    "co-found and manage the company",
    "lead technical architecture and product development",
    "turn attention into durable digital systems",
  ],
}
```

Add `discuss a project`, `impressum`, and `datenschutz` links. Render internal links without `target="_blank"`; retain a new tab only for HTTP(S) external links.

- [ ] **Step 4: Run the focused test and confirm success**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "business identity" --reporter=line`

Expected: PASS.

### Task 2: Personal legal routes

**Files:**
- Create: `app/legal.module.css`
- Create: `app/impressum/page.tsx`
- Create: `app/datenschutz/page.tsx`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: global color and font tokens from `app/globals.css`.
- Produces: static `/impressum/` and `/datenschutz/` routes with metadata and navigation back to `/`.

- [ ] **Step 1: Add failing legal-route assertions**

Assert both routes return below 400, show their H1, include Jonas’s confirmed identity/contact details, and link back to the homepage. Assert Datenschutz describes server logs, email contact, consent storage, Google Analytics, consent withdrawal, and data-subject rights.

- [ ] **Step 2: Run the legal-route tests and confirm failure**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "legal" --reporter=line`

Expected: FAIL with 404 responses.

- [ ] **Step 3: Implement the static routes and shared styling**

Use semantic `<main>`, `<article>`, `<h1>`, `<h2>`, `<address>`, `<p>`, and `<a>` elements. Keep paragraphs concise and identify the privacy text as information about data processing, not a compliance guarantee. Include the update date `16. August 2026`.

- [ ] **Step 4: Run the legal-route tests and confirm success**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "legal" --reporter=line`

Expected: PASS.

### Task 3: Basic analytics consent and settings

**Files:**
- Create: `app/AnalyticsConsent.tsx`
- Create: `app/AnalyticsConsent.module.css`
- Modify: `app/layout.tsx`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: GA measurement ID `G-VW07BRCCZ3` and browser `localStorage`.
- Produces: localStorage key `jonasknppel.analytics-consent` with values `accepted` or `rejected`; global consent prompt/settings UI; GA loader created only for `accepted`.

- [ ] **Step 1: Add failing network/state tests**

Track requests to `googletagmanager.com` and `google-analytics.com`. Assert zero matching requests for a fresh visitor and after “necessary only”; assert a Google tag request after “accept analytics”. Assert a persistent “cookie settings” button exists.

- [ ] **Step 2: Run the consent tests and confirm failure**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "analytics consent" --reporter=line`

Expected: FAIL because GA currently loads before consent.

- [ ] **Step 3: Remove unconditional analytics and implement the consent client**

Remove both GA `<Script>` nodes and the `next/script` import from `app/layout.tsx`. Mount `<AnalyticsConsent measurementId="G-VW07BRCCZ3" />` after page content. The client must:

```ts
type ConsentChoice = "accepted" | "rejected" | null;
const storageKey = "jonasknppel.analytics-consent";
```

Only call `document.createElement("script")` for `https://www.googletagmanager.com/gtag/js?id=...` when choice is `accepted`. Initialize `dataLayer` and `gtag('config', measurementId, { anonymize_ip: true })` only after acceptance. Persist rejection without loading Google. On withdrawal, set rejected, delete first-party `_ga` cookies, and reload so the loaded runtime cannot continue.

- [ ] **Step 4: Run the consent tests and confirm success**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "analytics consent" --reporter=line`

Expected: PASS.

### Task 4: Metadata, structured data, llms.txt, and sitemap

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `public/llms.txt`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: canonical URL `https://jonasknppel.me` and existing JSON-LD graph.
- Produces: synchronized title, description, Open Graph/Twitter metadata, accessible heading, Person/Organization relationship, legal sitemap entries, and LLM entity summary.

- [ ] **Step 1: Add failing metadata/entity assertions**

Assert the homepage title includes `Co-Founder`, the meta description contains `managing director and CTO at Kernscale`, JSON-LD exposes the matching `jobTitle`, and `/sitemap.xml` lists all three public routes.

- [ ] **Step 2: Run the metadata tests and confirm failure**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "entity metadata" --reporter=line`

Expected: FAIL against outdated title/job title and one-entry sitemap.

- [ ] **Step 3: Synchronize the entity layer**

Use title `Jonas Knüppel | Co-Founder, Managing Director & CTO at Kernscale` and description `Jonas Knüppel is co-founder, managing director and CTO at Kernscale, leading technical architecture, product development and digital attention systems.` Update the accessible H1, `Person.jobTitle`, Kernscale organization `legalName`, social cards, and `llms.txt`. Set sitemap modification dates to `2026-08-16` and include `/impressum/` and `/datenschutz/`.

- [ ] **Step 4: Run the metadata tests and confirm success**

Run: `npx playwright test tests/e2e/home.spec.ts --grep "entity metadata" --reporter=line`

Expected: PASS.

### Task 5: Targeted validation and implementation report

**Files:**
- Create: `.orchestration/cookie-consent-implementation-report.md`
- Modify only if failures require a scoped fix: files listed above.

**Interfaces:**
- Consumes: all completed implementation tasks.
- Produces: concise validation evidence and residual-risk record.

- [ ] **Step 1: Run changed-file lint**

Run: `npx eslint app/content.ts app/page.tsx app/layout.tsx app/AnalyticsConsent.tsx app/impressum/page.tsx app/datenschutz/page.tsx app/sitemap.ts tests/e2e/home.spec.ts`

Expected: exit 0.

- [ ] **Step 2: Run the named affected browser spec**

Run: `npx playwright test tests/e2e/home.spec.ts --reporter=line`

Expected: all tests pass.

- [ ] **Step 3: Run static tag discovery**

Run: `rg -n "googletagmanager|google-analytics|gtag|<Script|<iframe" app`

Expected: Google endpoints appear only in the consent client; no unconditional third-party scripts or iframes remain.

- [ ] **Step 4: Write the implementation report**

Record fresh/reject/accept/settings behaviors tested, commands and results, the fact that this is engineering implementation rather than legal advice, and these residual checks: deployed network/storage review, legal review of the published copy, and separate Kernscale legal-page changes.

- [ ] **Step 5: Review the final diff**

Run: `git diff --check && git status --short && git diff --stat`

Expected: no whitespace errors; only scoped site files, plan documents, and the report are changed; pre-existing unrelated untracked files remain untouched.
