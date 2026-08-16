# Cookie Consent Implementation Report

## Scope

- Site: `jonasknppel.me`
- Branch/commit: `agent/ignore-idea-files` at implementation commit `80fc45d`
- Router: Next.js App Router
- Package: local consent boundary modeled on the Kernscale integration API; no unpublished or machine-local package dependency
- Mode: direct Google Analytics tag, basic consent mode

## Inputs Confirmed

- Usercentrics Settings ID: not applicable; Usercentrics is not used
- Usercentrics DPS/service mapping: not applicable
- GTM ID: not applicable; GTM is not used
- GA/Ads IDs: GA4 `G-VW07BRCCZ3`; no Google Ads ID
- Legal/category decisions: necessary storage is always available; analytics is optional and denied by default
- Privacy/cookie policy links: `/datenschutz/`; settings control available on every route

## Changes Made

- Consent config: versioned state at `jonasknppel.analytics-consent`
- Root layout/provider: denied Google Consent Mode defaults run in the initial head; the analytics client is mounted globally
- Settings entry point: persistent `Cookie-Einstellungen` button and first-visit prompt
- Direct tags gated: Google Analytics loader is created only after analytics consent
- GTM changes: none
- Embeds blocked: none present
- Env/docs updated: no environment variable is required; the privacy notice documents the implemented behavior

## Vendor Mapping

| Vendor | DPS/service | Category | Package key | Load path | Validation result |
| --- | --- | --- | --- | --- | --- |
| Google Analytics 4 | Google Analytics | analytics | `analytics` | Direct `gtag.js`, only after opt-in | Passed targeted request and storage checks |

## Validation

| State | Result | Evidence |
| --- | --- | --- |
| Fresh visitor | Passed | Denied defaults present; no Google tag request; prompt visible |
| Reject non-essential | Passed | `essential_only` persisted; no Google tag request before or after reload |
| Accept all | Passed | `all_accepted` persisted; Google tag request occurs only after click |
| Custom preferences | Not applicable | Analytics is the only optional category |
| Withdrawal | Passed | `withdrawn` persisted; GA cookies removed where reachable; reload prevents later Google tag requests |
| Reload/navigation | Passed | Accepted choice reloads GA; rejected/withdrawn choice keeps it blocked; settings remain available |

## Network and Storage Notes

- Pre-consent requests: no request to `googletagmanager.com` or `google-analytics.com`
- Post-reject requests: none
- Post-accept requests: direct `gtag.js` request observed and intercepted in Playwright
- Cookies/localStorage/sessionStorage: versioned consent JSON in localStorage; GA first-party cookies are removed on withdrawal when accessible to the site
- Blocked embeds: no third-party embeds exist in the reviewed app

## Checks Run

- `npx eslint` on all changed TypeScript/TSX files: passed
- `npx tsc --noEmit`: passed
- Chromium targeted specs for homepage, legal routes, entity metadata, and consent lifecycle: 10 passed
- Generated social preview: `/opengraph-image` returned a 1200×630 PNG
- Static tag discovery: Google tag loading exists only in the consent client; denied defaults exist in the consent config

## Skipped Checks

- Firefox and mobile-browser projects
- Full Playwright suite and production build, per repository validation limits
- Deployed-domain network/storage inspection and GA Realtime verification
- Legal review of the Impressum and Datenschutzerklärung
- The separate Kernscale website and its legal pages, which are outside this repository

## Residual Risk

- The legal copy should be reviewed by the site owner or qualified legal reviewer, including hosting-provider identity, exact log retention, and GA property retention settings.
- Withdrawal prevents future loading after reload and removes reachable first-party GA cookies; browser or third-party storage outside the site’s control may require separate verification.
- The deployed site still needs a fresh/reject/accept/withdraw network check after release.
- Kernscale’s live Impressum and Datenschutzerklärung still require their separate repository update to the new company details.
- This report is an engineering validation record, not a legal compliance opinion.
