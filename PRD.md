# Product Requirements Document (PRD)

Project Name: Personal Page (Hero)
Owner: Jonas Knappel
Date: 2026-01-26

## 1) Overview
Create a single-page Next.js + React hero site that presents a short personal intro. The aesthetic should be minimal and dark, inspired by the provided reference image. The primary text is revealed with a typed.js animation, accompanied by a subtle high-pitch "typewriter" sound per character. Social links include Instagram, Booked, and X with hover effects.

Content copy lives in a single module for easy updates without reworking layout or animation logic.

## 2) Goals
- Deliver a polished, minimal hero page that feels intentional and cinematic.
- Provide a typewriter effect that feels smooth and legible.
- Add per-character audio feedback that is subtle and non-intrusive.
- Ensure the page is fast, accessible, and responsive.

## 3) Non-Goals
- Multi-page navigation, blog, or CMS.
- Complex animations beyond the typed effect and link hovers.
- Server-side data fetching or backend integration.

## 4) Target Audience
- Visitors looking for a quick, high-signal intro to Jonas and contact paths.
- Potential collaborators, clients, and peers.

## 5) User Stories
- As a visitor, I want a short, clear intro that appears with a distinct typed effect.
- As a visitor, I want to easily find and click social links.
- As a visitor, I want the page to load quickly on mobile and desktop.
- As a visitor who prefers reduced motion or silence, I want the effects to be unobtrusive or disabled.

## 6) Functional Requirements
1. Single-page layout (hero only).
2. Main text area includes:
   - Intro line (typed).
   - Supporting lines or bullet list (typed or sequential reveal).
3. Typed.js integration:
   - Typing speed and delay tuned for readability.
   - Cursor visible and styled to match the design.
4. Start control:
   - "Start the journey" button begins typing and audio.
5. Audio per character:
   - High-pitch, short "beep" (typewriter-style).
   - Audio starts only after explicit user interaction (e.g., first click/keypress).
   - Provide a mute toggle or respect browser autoplay restrictions.
6. Social links:
   - Instagram, Booked, X.
   - Hover effects with a subtle glow/underline/shift.
7. Inline lead link:
   - The word "booked" in the lead text is a clickable link with the same hover effect as other links.
8. Typography:
   - Inter as the primary font.
9. Responsive design:
   - Mobile-first, readable text scale and line lengths.
10. Favicon:
   - Use the provided PNG as the browser favicon.

## 7) Non-Functional Requirements
- Performance: Fast load, minimal dependencies.
- Accessibility:
  - Respect `prefers-reduced-motion` by disabling typing animation in favor of static text.
  - Ensure text contrast on dark background meets WCAG AA.
- Reliability:
  - No errors when audio is blocked or unavailable.

## 8) UX/UI Direction
- Visual style: Minimal, dark, cinematic.
- Layout: Single column, centered or slightly left-aligned block, generous whitespace.
- Background: Subtle gradient or texture (no flat black).
- Link hover: Clear, crisp emphasis without neon or overly flashy effects.
- Cursor: Slim caret, muted color, consistent with text.

## 9) Content Strategy
- Use placeholder text for now.
- Ensure text is sourced from a single config/module for easy replacement.

## 10) Success Metrics
- Page loads in under 1s on a fast connection.
- All links clearly discoverable and tappable on mobile.
- Visitors can read the full intro without visual clutter.

## 11) Risks and Mitigations
- Autoplay audio restrictions:
  - Require user interaction and provide fallback (no audio).
- Motion sensitivity:
  - Provide reduced motion behavior with immediate full text.

## 12) Milestones
1. Scaffold Next.js app and layout. (done)
2. Implement typed.js effect. (done)
3. Implement audio feedback with mute/interaction gating. (done)
4. Add "Start the journey" trigger. (done)
5. Add inline Booked link styling in lead. (done)
6. Set PNG favicon. (done)
