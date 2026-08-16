# Personal Site Legal, Role, SEO, and Conversion Design

Date: 2026-08-16

## Objective

Update Jonas Knüppel’s personal website so it accurately presents his current Kernscale role, provides personal legal pages, prevents Google Analytics from loading before analytics consent, strengthens entity metadata, and adds a restrained business conversion path.

## Confirmed facts

- Public role: co-founder and managing director, and CTO at Kernscale.
- Personal website operator: Jonas Knüppel.
- Address: Greifstraße 22, 17034 Neubrandenburg, Deutschland.
- Contact email: info@jonasknppel.me.
- Kernscale’s website is a separate system and is outside this repository’s implementation boundary.

## Homepage design

Preserve the current single-screen, lowercase, typewriter-led experience. Replace the outdated self-employed label with the confirmed Kernscale role. Add exactly one new Kernscale section containing three short bullets in the existing text style. Keep the existing Kernscale and social links and add one direct business CTA labelled “discuss a project” that opens an email to Jonas.

The additional Kernscale bullets should explain Jonas’s responsibilities without unsupported performance claims:

- co-found and manage kernscale
- lead technical architecture and product development
- turn attention into durable digital systems

## Legal pages

Add static German-language routes at `/impressum/` and `/datenschutz/`. The Impressum identifies Jonas personally using the confirmed address and email. The privacy page describes only processing evidenced by this repository: hosting/server logs, email contact, consent storage, and consent-gated Google Analytics. It must state that analytics is optional and only enabled after consent, provide withdrawal instructions, and avoid claiming legal compliance.

Both pages use a compact readable treatment derived from the existing visual system. Footer links make the pages durable and accessible from the homepage.

## Analytics consent

Remove unconditional Google Analytics scripts from the root layout. A small client-side consent control provides accept and reject actions, persists the choice locally, and injects the Google tag only after an explicit analytics opt-in. A persistent cookie-settings control lets visitors revisit and withdraw the choice. Rejection and withdrawal remove GA cookies accessible to the site and prevent further tag loading during the session.

If concurrent cookie-integration work lands before implementation, adapt to its established consent provider instead of introducing a second consent system.

## SEO and entity data

Synchronize the confirmed role and Kernscale relationship across the page title, description, accessible heading, `Person` JSON-LD, Open Graph/Twitter data, and `llms.txt`. Add legal routes to the sitemap and update their modification date to 2026-08-16. Keep the existing canonical host and social-preview image unless a new approved asset exists.

## Validation

- Add targeted Playwright coverage for visible role/CTA/legal links and legal routes.
- Validate that no request to `googletagmanager.com` or `google-analytics.com` occurs before consent and that it occurs after opt-in.
- Run ESLint only on changed frontend files.
- Run the named homepage Playwright spec only; do not run the full suite or production build.

## Out of scope

- Editing Kernscale’s separate website or legal pages.
- Inventing missing company registration, tax, telephone, hosting-provider, or data-protection facts.
- Adding more than one new three-item Kernscale section.
- Replacing Google Analytics with a new analytics provider.
