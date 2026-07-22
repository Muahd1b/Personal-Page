# Project Context

Last reviewed: 2026-07-22

## Purpose

This repository powers Jonas Knüppel’s canonical personal website at `https://jonasknppel.me/`.

The site is a compact personal positioning experience, not a conventional résumé, portfolio, publication archive, or general-purpose company website. It introduces Jonas, communicates his interests and current work, and directs visitors to Kernscale and selected social profiles.

The internal project name is **Attention is currency**.

## Jonas Knüppel

Jonas Knüppel is a Germany-based student, builder, and entrepreneur from Neubrandenburg.

Publicly stated current context:

- Born in Neubrandenburg and raised in Germany.
- Currently completing school.
- Public LinkedIn information identifies Sportgymnasium Neubrandenburg and describes Jonas as self-employed.
- Co-founder and CTO of Kernscale.
- Responsible at Kernscale for technical architecture, performance, and implementation quality.
- Works across web development, digital branding, digital persuasion, and attention systems.
- Develops skills in design and software development.
- Studies attention through the intersecting lenses of psychology, economics, technology, and innovation.
- Flies sailplanes around Europe.

Treat education, role, location, and “currently” statements as time-sensitive. Verify them before publishing substantially revised biographical copy.

Do not infer private facts, credentials, client results, age, or accomplishments that are not explicitly supported by Jonas’s own materials or another authoritative public source.

## Kernscale

Kernscale is the primary business entity associated with Jonas.

Kernscale presents itself as a digital-branding and web-development business that helps companies turn online visibility into measurable demand.

Its public service model includes:

- Brand positioning
- Interface and web design
- Web development
- Attention systems
- Social media and performance marketing

The public Kernscale site describes Jonas as co-founder and CTO, focused on technical architecture, performance, reliable implementation, modern web development, and digital transformation.

Linus Kern is presented as co-founder and CMO, focused on brand positioning, strategy, content, and visibility.

The personal site currently links to `https://www.kernscale.de/`. Kernscale also operates an English-language presence at `https://kernscale.com/`.

## Positioning thesis

The site’s central thesis is:

> Attention is currency.

This phrase frames attention as a scarce resource that can be earned, directed, and transformed into perception, visibility, trust, and demand.

The desired public impression combines:

- Technical competence
- Strategic curiosity
- Youthful ambition
- Deliberate experimentation
- Minimal, cinematic presentation
- Interest in how people and systems allocate attention

The voice is lowercase, concise, confident, experimental, and concept-driven. It should remain human and slightly playful rather than reading like generic agency copy.

Avoid unsupported superlatives, inflated business claims, or language that implies independently verified results where the source only provides self-description.

## Domain vocabulary

### Attention

A scarce human and market resource. The site treats attention as the starting point for perception, brand recognition, and commercial demand.

### Attention system

A structured combination of positioning, content, distribution, design, outreach, and measurement intended to build reach and demand.

Use this term when discussing repeatable mechanisms. Do not use it as a decorative synonym for ordinary marketing.

### Digital persuasion

The deliberate use of messaging, design, interaction, and distribution to influence how an audience perceives and responds to a person or brand.

The term should not imply deception or coercion.

### Digital appearance

The total outward presentation of a person or organization across websites, social channels, content, and related digital touchpoints.

Prefer `digital presence` when writing conventional client-facing copy. Preserve `digital appearance` when referring directly to the current personal-site narrative.

### Organic intelligence

A project-specific positioning term connecting human judgment, psychology, cultural understanding, lived experience, and naturally developed insight.

This is not treated here as a formally established technical discipline.

### Generative intelligence

A project-specific positioning term for using generative systems and creative computation to expand ideation, production, and experimentation.

Do not reduce it to a generic synonym for artificial intelligence.

### Artificial perception

A project-specific phrase for shaping or studying how digital systems, algorithms, and mediated environments construct or influence what becomes visible and how it is interpreted.

The phrase is intentionally conceptual. Avoid presenting it as a proven proprietary methodology unless that methodology is documented later.

### Brand system

The reusable set of positioning, language, visual rules, components, content patterns, and operating practices that keeps a brand recognizable and coherent.

### Sustainable outreach and management systems

Repeatable processes for finding, contacting, qualifying, and managing relationships without depending entirely on one-off manual effort.

“Sustainable” means maintainable and repeatable here; it does not automatically imply environmental sustainability.

### Sidequest

A personal pursuit adjacent to the main Kernscale narrative. Current sidequests include design, software development, attention research, and sailplane flying.

Use `sidequest` only where the informal brand voice is appropriate.

## Website experience

The homepage is a single-screen, single-page introduction with no conventional navigation hierarchy.

The intended journey is:

1. A dark loading screen establishes anticipation.
2. The visitor selects “start the journey.”
3. Introductory copy appears through a typewriter animation.
4. Optional synthesized typing audio reinforces the interaction.
5. The copy introduces Jonas, Kernscale, selected accomplishments, interests, and current context.
6. Footer links direct visitors to Kernscale, Instagram, and X.

The experience is deliberately cinematic and interaction-led. The animation is part of the positioning, but the information must remain available to screen readers, search engines, visitors with reduced-motion preferences, and browsers without audio or WebGL support.

## Audience

Primary audiences are:

- Potential Kernscale clients
- Potential collaborators
- Builders, designers, marketers, and peers
- People discovering Jonas through search engines, social profiles, or referrals
- Search and answer engines resolving Jonas and Kernscale as related entities

Visitors should quickly understand who Jonas is, what he is interested in, what Kernscale does, and where to continue.

## Product goals

- Deliver a memorable, high-signal introduction.
- Establish Jonas as the canonical person entity associated with the domain.
- Connect Jonas clearly to Kernscale.
- Communicate the intersection of technology, design, psychology, economics, and marketing.
- Remain fast, responsive, accessible, indexable, and statically deployable.
- Keep public copy easy to update without modifying interaction logic.

## Non-goals

Unless the product direction changes explicitly, this site is not:

- A blog
- A CMS
- A multi-page résumé
- A complete project archive
- A client dashboard
- An e-commerce experience
- A backend application
- The primary source for detailed Kernscale service information

## Content model

Canonical homepage copy lives in `app/content.ts`.

`heroContent` contains:

- Intro
- Lead statement
- Narrative sections
- Bullet items
- Personal metadata
- External links

`heroPlainText` produces a non-animated text representation for accessibility and machine consumption.

When changing public claims, review all duplicated representations:

- `app/content.ts`
- Metadata and structured data in `app/layout.tsx`
- The accessible heading in `app/page.tsx`
- `public/llms.txt`
- `README.md`
- `PRD.md`, when product intent changes

Avoid allowing visible copy, metadata, JSON-LD, and `llms.txt` to describe materially different versions of Jonas or Kernscale.

## Technical architecture

The application uses:

- Next.js 16
- React 19
- TypeScript
- CSS Modules
- `typed.js`
- Web Audio API
- Canvas and WebGL
- Google Analytics

It is configured as a static export through `next.config.ts`. Production output is generated in `out/` and uploaded to private hosting. GitHub Actions validates and packages the export but does not deploy to GitHub Pages.

Important implementation boundaries:

- `app/page.tsx` owns the interactive homepage.
- `app/content.ts` owns editable hero copy and links.
- `app/page.module.css` owns page-level visual presentation.
- `app/globals.css` owns global tokens and baseline styles.
- `app/layout.tsx` owns metadata, analytics, fonts, and JSON-LD.
- `app/robots.ts` and `app/sitemap.ts` own crawler discovery.
- `public/llms.txt` provides a machine-readable entity summary.

There is no backend, database, authentication system, CMS, or runtime content API.

## Visual language

The visual system is:

- Near-black navy background
- Warm off-white text
- Muted secondary typography
- Inter for primary text
- Roboto Mono for supporting monospaced treatment
- Generous whitespace
- Narrow, centered content column
- Subtle borders and restrained glow
- Animated grid atmosphere responding to pointer movement
- Minimal controls with lowercase labels

Visual changes should preserve the restrained, cinematic character. Avoid generic dashboard aesthetics, dense card grids, loud gradients, excessive neon, or ornamental interface elements without a narrative purpose.

## Accessibility and resilience

Preserve these behaviors:

- Respect `prefers-reduced-motion`.
- Provide full static text when typing animation is reduced.
- Keep semantic and screen-reader-accessible text available.
- Require explicit interaction before initializing audio.
- Keep audio optional and non-blocking.
- Maintain keyboard focus states.
- Ensure the experience remains understandable if animation, audio, image loading, canvas, or WebGL fails.
- Maintain readable contrast and mobile typography.

## Search and entity representation

The canonical URL is `https://jonasknppel.me/`.

The site uses:

- Canonical metadata
- Open Graph metadata
- Twitter card metadata
- `Person`, `WebSite`, and `ProfilePage` JSON-LD
- `robots.txt`
- `sitemap.xml`
- `llms.txt`

The intended entity relationship is:

Jonas Knüppel → co-founds and technically leads Kernscale → works in digital branding, web development, digital persuasion, and attention systems.

Metadata should describe the actual visible experience. Do not use keywords or structured-data claims that the page cannot substantiate.

## External links

Current canonical public destinations:

- Personal homepage: `https://jonasknppel.me/`
- Kernscale Germany: `https://www.kernscale.de/`
- Kernscale international: `https://kernscale.com/`
- Instagram: `https://www.instagram.com/jonasknppel/`
- X: `https://x.com/Knaviation_og`
- LinkedIn: `https://de.linkedin.com/in/jonas-kn%C3%BCppel-31b99a376/de`

External profiles are supporting sources, not authorities that can silently override repository intent. Reconcile conflicting information deliberately.

## Evidence and maintenance

This context was derived from:

- Repository source and documentation
- The live `jonasknppel.me` homepage
- Kernscale’s German and international websites
- Jonas’s publicly indexed LinkedIn profile

Separate three evidence levels when extending this document:

1. Verified implementation facts from the repository
2. Current public self-descriptions from first-party sites and profiles
3. Aspirational positioning or interpretive language

Label uncertain or time-sensitive information instead of turning it into a permanent fact.
