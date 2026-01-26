# AGENTS.md

This file defines how contributors and coding agents should work in this repository.

## Project Summary
Single-page hero site (Next.js + React) with a minimal, dark aesthetic. The hero text is revealed with typed.js and a subtle high-pitch per-character sound. Social links (Instagram, Business, X) have hover effects.

## Scope
- One page only (hero).
- No backend, no CMS, no multi-page routing.
- Content is placeholder for now and should be easy to replace.

## Stack Expectations
- Framework: Next.js (React).
- Font: Inter.
- Typed animation: typed.js.
- Styling: keep dependencies minimal; prefer plain CSS or lightweight utilities.

## Design Requirements
- Dark, cinematic, minimal feel inspired by the provided reference image.
- Single column text block with generous whitespace.
- Subtle background texture or gradient (avoid flat black).
- Hover effects are crisp and restrained (underline, glow, or slight motion).

## Content Handling
- Store text in a single source (e.g., `content.ts` or `content.json`).
- Avoid hardcoding strings across multiple components.
- Copy is TBD; use placeholders that are easy to swap later.

## Typed.js Behavior
- Typing speed should be readable (not too fast).
- Cursor visible, thin, and styled to match text color.
- Provide a reduced-motion fallback (render full text instantly when
  `prefers-reduced-motion` is true).

## Audio Behavior
- Play a short, high-pitch "typewriter" beep per character.
- Audio must only start after user interaction (click/keypress).
- Include a mute toggle or silent fallback if audio is blocked.
- Avoid overlapping sounds; throttle or reuse a single Audio/oscillator.

## Accessibility
- Maintain WCAG AA contrast for text.
- Respect `prefers-reduced-motion`.
- Links must be keyboard accessible with clear focus styles.

## Performance
- Keep bundle size minimal (avoid large libraries).
- Lazy-load only if needed; avoid heavy imagery.

## File Structure Guidance
- `app/` for Next.js app router pages/layout.
- `public/` for static assets (if any).
- `styles/` or `app/globals.css` for global styling.

## Workflow Expectations
- Update `README.md` when features, setup, or scripts change.
- Keep `PRD.md` aligned with implemented behavior.
- If adding libraries or assets, justify and document the choice.

## Testing
- At minimum, verify:
  - Typed text renders and animates.
  - Audio gating works after user interaction.
  - Mobile layout is readable and unclipped.
  - Links and hover/focus styles are visible.
