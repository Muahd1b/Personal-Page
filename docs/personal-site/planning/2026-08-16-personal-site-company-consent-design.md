# Personal Site Company and Consent Design

**Date:** 2026-08-16

## Goal

Update Jonas Knüppel’s personal website to reflect his role at Kernscale, add one concise three-item Kernscale section, provide clear business and legal navigation, and prevent Google Analytics from loading before an explicit analytics choice.

## Content design

Keep the existing single-page terminal-like experience and add only one section:

> at kernscale we’re  
> - building managed media intelligence for small businesses  
> - connecting media, marketing and business context  
> - turning measured outcomes into better next decisions

The biographical line becomes `currently: co-founder, managing director & cto at kernscale`. The footer adds an email-based `discuss a project` CTA plus Impressum, privacy, and cookie-settings controls without introducing a separate marketing section.

## Consent design

Use basic Google Consent Mode v2: optional consent defaults are denied before any Google measurement tag exists, and the Google Analytics loader is rendered only after analytics consent. The choice is stored as first-party necessary state with a version so future policy changes can request consent again. Visitors can accept analytics, continue with only necessary storage, or reopen settings from the footer and legal pages.

The local Kernscale package API was inspected and confirmed, but `@kernscale/cookie-integration` is not published and is not a deployable dependency of this repository. This site therefore implements the same narrow provider/head/settings/direct-tag pattern locally instead of adding a machine-specific `file:` dependency. It does not use Usercentrics, GTM, ads, marketing tags, or embeds.

## Legal pages

The operator is Jonas Knüppel, Greifstraße 22, 17034 Neubrandenburg, Germany, with `info@jonasknppel.me` as the electronic contact. Add compact German Impressum and Datenschutzerklärung pages. The privacy notice describes site delivery/server logs, consent storage, and Google Analytics as the only known optional vendor. The pages are engineering content for review and must not be described as a legal-compliance opinion.

## SEO and entity design

Use `Jonas Knüppel | Co-founder & CTO at Kernscale` as the page title and align the description, hidden heading, Person JSON-LD job title, Kernscale organization name, `llms.txt`, and social preview. Generate a 1200×630 Open Graph image from the app so no additional photo or large content block is required. Add the homepage, Impressum, and privacy page to the sitemap with the current date.

## Validation

Run ESLint on changed frontend files, TypeScript with `--noEmit`, the affected Playwright specs, and browser request/storage checks for fresh, reject, accept, reload, settings withdrawal, and legal-page navigation. Confirm no request to Google Analytics or Google Tag Manager occurs before analytics consent.
