Attention is currency

Single-page hero site built with Next.js + React. Inter typography, typed.js text reveal with audio, SEO metadata focused on organic and generative intelligence, and hover effects on social links.

Status
- Content is editable in `app/content.ts`.
- The current public site remains on private hosting until the reviewed
  Kernscale release is approved.
- Production is prepared as an isolated Next.js standalone service behind
  Cloudflare Tunnel and Traefik.

Features
- Hero-only layout inspired by the provided reference image.
- Typed.js text animation for the intro and supporting lines.
- "Start the journey" button to begin the typing + audio.
- High-pitch "typewriter" beep on each character (user-initiated audio).
- Hover effects for Instagram and X links.
- PNG favicon sourced from `Favicon/Design ohne Titel.png`.

Docs
- Product requirements: `PRD.md`
- Contributor guidance: `AGENTS.md`

Getting Started
- `npm install`
- `npm run dev`

Deployment
- `npm run build` generates the Next.js standalone runtime.
- `docker build -t personal-page:local .` builds the production image.
- Production uses an immutable `ghcr.io/muahd1b/personal-page@sha256:...`
  release identity; mutable tags such as `latest` are not deployed.
- See `deploy/README.md` for the Compose, health-check, verification, backup,
  and rollback contract.
