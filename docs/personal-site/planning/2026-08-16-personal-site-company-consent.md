# Personal Site Company and Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update Jonas Knüppel’s personal website with his Kernscale role, one three-bullet Kernscale section, legal pages, consent-gated Google Analytics, aligned entity metadata, and business CTAs.

**Architecture:** Keep the existing App Router page and terminal interaction. Add a local consent boundary modeled on the verified `@kernscale/cookie-integration` API because that package is not published and a local `file:` dependency would not deploy. Use basic Google Consent Mode v2 with denied defaults in the document head and render the direct Google Analytics tag only after the local provider records analytics consent.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Next metadata/ImageResponse, Playwright.

## Global Constraints

- Add only one new three-point Kernscale bullet list to the homepage content.
- Keep the existing Google Analytics ID `G-VW07BRCCZ3`; do not add GTM, Ads, Usercentrics, or unconfirmed vendors.
- Treat `necessary` as required and `analytics` as optional.
- Never load a Google measurement script before analytics consent.
- Legal operator: Jonas Knüppel, Greifstraße 22, 17034 Neubrandenburg, Germany, `info@jonasknppel.me`.
- Do not claim legal compliance; the legal copy remains subject to owner/legal review.
- Preserve unrelated user work under `docs/funding/` and `docs/research/`.

---

### Task 1: Consent-gated Google Analytics

**Files:**
- Create: `app/consent/config.ts`
- Create: `app/consent/ConsentProvider.tsx`
- Create: `app/consent/consent.module.css`
- Modify: `app/layout.tsx`
- Create: `tests/e2e/consent.spec.ts`

**Interfaces:**
- Produces: `consentConfig`, `googleConsentDefaultsScript`, `ConsentProvider`, and `CookieSettingsButton`.
- Consumes: existing Google Analytics measurement ID `G-VW07BRCCZ3`.

- [ ] **Step 1: Write the failing consent browser tests**

Add tests that abort and record `https://www.googletagmanager.com/gtag/js*`, open `/`, and assert:

```ts
expect(googleRequests).toEqual([]);
await expect(page.getByRole("region", { name: "privacy settings" })).toBeVisible();
await page.getByRole("button", { name: "only necessary" }).click();
expect(googleRequests).toEqual([]);
expect(await page.evaluate(() => localStorage.getItem("jonas.cookie-consent"))).toContain("essential_only");
```

Add accept, reload, settings, and withdrawal assertions. Acceptance must produce the GA loader request; withdrawal must persist `analytics: false` and keep the next reload free of Google requests.

- [ ] **Step 2: Run the consent spec and verify failure**

Run: `npx playwright test tests/e2e/consent.spec.ts --reporter=line`

Expected: failure because no consent UI or storage state exists and GA loads immediately.

- [ ] **Step 3: Add the consent config and denied-default script**

Define:

```ts
export const consentConfig = {
  consentVersion: "2026-08-16",
  storageKey: "jonas.cookie-consent",
  measurementId: "G-VW07BRCCZ3",
} as const;
```

The head script must create `window.dataLayer`, define `gtag`, and run:

```js
gtag("consent", "default", {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "denied",
  personalization_storage: "denied",
  security_storage: "granted",
  wait_for_update: 500,
});
```

- [ ] **Step 4: Implement the provider and settings control**

Persist this versioned shape:

```ts
type ConsentState = {
  version: string;
  status: "all_accepted" | "essential_only" | "withdrawn";
  analytics: boolean;
  updatedAt: string;
};
```

Render a compact banner when no valid state exists. `accept analytics` saves `analytics: true`, updates Google consent to granted, and renders the direct GA loader. `only necessary` saves false without rendering the loader. `CookieSettingsButton` reopens the same controls. If storage cannot be read or written, keep analytics disabled and keep the current in-memory choice only.

- [ ] **Step 5: Replace unconditional analytics in the root layout**

Place the denied-default script in `<head>`, wrap all body content in `ConsentProvider`, and remove both unconditional Google scripts from `app/layout.tsx`.

- [ ] **Step 6: Run the consent spec**

Run: `npx playwright test tests/e2e/consent.spec.ts --reporter=line`

Expected: all consent state tests pass.

- [ ] **Step 7: Commit the consent unit**

```bash
git add app/consent app/layout.tsx tests/e2e/consent.spec.ts
git commit -m "feat: gate analytics behind consent"
```

### Task 2: Kernscale role, content, CTAs, and entity metadata

**Files:**
- Modify: `app/content.ts`
- Modify: `app/page.tsx`
- Modify: `app/page.module.css`
- Modify: `app/layout.tsx`
- Create: `app/opengraph-image.tsx`
- Modify: `public/llms.txt`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: `CookieSettingsButton` from Task 1.
- Produces: updated homepage content, navigation, metadata, JSON-LD, and 1200×630 social preview.

- [ ] **Step 1: Add failing homepage assertions**

Assert the accessible page contains:

```ts
await expect(page.getByText("currently: co-founder, managing director & cto at kernscale")).toBeAttached();
await expect(page.getByText("at kernscale we’re")).toBeAttached();
await expect(page.getByRole("link", { name: "discuss a project" })).toHaveAttribute(
  "href",
  "mailto:info@jonasknppel.me",
);
await expect(page.getByRole("link", { name: "impressum" })).toHaveAttribute("href", "/impressum");
```

- [ ] **Step 2: Run the homepage spec and verify failure**

Run: `npx playwright test tests/e2e/home.spec.ts --reporter=line`

Expected: failure on the new role, Kernscale section, and CTA assertions.

- [ ] **Step 3: Update homepage content with exactly one new section**

Add:

```ts
{
  title: "at kernscale we’re",
  items: [
    "building managed media intelligence for small businesses",
    "connecting media, marketing and business context",
    "turning measured outcomes into better next decisions",
  ],
}
```

Replace the meta line with `born: neubrandenburg / raised: germany / currently: co-founder, managing director & cto at kernscale`. Add links for `discuss a project`, `impressum`, `privacy`, and a cookie-settings button while retaining Kernscale, Instagram, and X.

- [ ] **Step 4: Align entity and search metadata**

Use:

```ts
const siteTitle = "Jonas Knüppel | Co-founder & CTO at Kernscale";
const siteDescription =
  "Jonas Knüppel is co-founder, managing director and CTO at Kernscale, where he leads product and technology for managed media intelligence.";
```

Set `Person.jobTitle` to `Co-founder, Managing Director and CTO`, retain the Kernscale organization URL, add its current legal name in `legalName`, and align the hidden `<h1>`, `llms.txt`, Open Graph, and Twitter metadata.

- [ ] **Step 5: Add a generated Open Graph image**

Create a 1200×630 `ImageResponse` with the existing dark background, Jonas Knüppel’s name, `co-founder & cto at kernscale`, and the Kernscale URL. Do not load remote image assets.

- [ ] **Step 6: Run the homepage spec**

Run: `npx playwright test tests/e2e/home.spec.ts --reporter=line`

Expected: all homepage assertions pass.

- [ ] **Step 7: Commit the content unit**

```bash
git add app/content.ts app/page.tsx app/page.module.css app/layout.tsx app/opengraph-image.tsx public/llms.txt tests/e2e/home.spec.ts
git commit -m "feat: align personal site with Kernscale role"
```

### Task 3: Impressum, privacy notice, and sitemap

**Files:**
- Create: `app/legal.module.css`
- Create: `app/impressum/page.tsx`
- Create: `app/datenschutz/page.tsx`
- Modify: `app/sitemap.ts`
- Create: `tests/e2e/legal.spec.ts`

**Interfaces:**
- Consumes: `CookieSettingsButton` from Task 1.
- Produces: indexable legal pages at `/impressum` and `/datenschutz` plus sitemap entries.

- [ ] **Step 1: Add failing legal-page assertions**

Assert both routes return below 400. The Impressum must expose Jonas Knüppel, Greifstraße 22, 17034 Neubrandenburg, Germany, and `mailto:info@jonasknppel.me`. The privacy page must identify Jonas as controller, describe necessary consent storage and Google Analytics, link to Google’s privacy information, and expose cookie settings.

- [ ] **Step 2: Run the legal spec and verify failure**

Run: `npx playwright test tests/e2e/legal.spec.ts --reporter=line`

Expected: navigation returns 404 because neither page exists.

- [ ] **Step 3: Implement the legal pages**

Use German headings and compact prose. The privacy page must describe:

```text
Verantwortlicher
Hosting und Server-Logfiles
Lokale Speicherung der Einwilligungsentscheidung
Google Analytics
Empfänger und Drittlandübermittlung
Speicherdauer
Widerruf der Einwilligung
Rechte betroffener Personen
Beschwerderecht
Stand: 16. August 2026
```

State that Google Analytics loads only after consent under Art. 6(1)(a) DSGVO together with § 25(1) TDDDG. Do not describe the engineering implementation as guaranteed legal compliance.

- [ ] **Step 4: Update the sitemap**

Set `lastModified` to `2026-08-16` and include `/`, `/impressum`, and `/datenschutz`, with the legal pages using lower priority than the homepage.

- [ ] **Step 5: Run the legal spec**

Run: `npx playwright test tests/e2e/legal.spec.ts --reporter=line`

Expected: all legal route and content assertions pass.

- [ ] **Step 6: Commit the legal-page unit**

```bash
git add app/legal.module.css app/impressum app/datenschutz app/sitemap.ts tests/e2e/legal.spec.ts
git commit -m "feat: add personal site legal pages"
```

### Task 4: Targeted validation and consent report

**Files:**
- Create: `docs/reports/2026-08-16-cookie-consent-implementation.md`

**Interfaces:**
- Consumes: all implementation units.
- Produces: a concise engineering validation record.

- [ ] **Step 1: Run static validation**

Run:

```bash
npx eslint app/content.ts app/page.tsx app/page.module.css app/layout.tsx app/opengraph-image.tsx app/consent/config.ts app/consent/ConsentProvider.tsx app/impressum/page.tsx app/datenschutz/page.tsx app/sitemap.ts tests/e2e/home.spec.ts tests/e2e/consent.spec.ts tests/e2e/legal.spec.ts
npx tsc --noEmit
rg -n "googletagmanager|google-analytics|gtag\(" app
```

Expected: lint and typecheck exit 0; search output contains only the denied-default script and consent-gated analytics component.

- [ ] **Step 2: Run affected browser flows**

Run:

```bash
npx playwright test tests/e2e/home.spec.ts tests/e2e/consent.spec.ts tests/e2e/legal.spec.ts --reporter=line
```

Expected: all affected tests pass.

- [ ] **Step 3: Record the validation matrix**

Create the report with exact results for fresh visitor, reject, accept, reload, withdrawal, navigation, Google request timing, localStorage, skipped checks, and residual legal/hosting review. Include the sentence: `This report is an engineering validation record, not a legal compliance opinion.`

- [ ] **Step 4: Review the final diff**

Run:

```bash
git diff --check
git status --short
git diff --stat HEAD~3..HEAD
```

Expected: no whitespace errors and no unrelated funding or research files staged or modified.

- [ ] **Step 5: Commit the validation report**

```bash
git add docs/reports/2026-08-16-cookie-consent-implementation.md
git commit -m "docs: record personal site consent validation"
```
