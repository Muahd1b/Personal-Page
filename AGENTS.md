# Personal Page Agent Contract

## Context
- Read `CONTEXT.md` first.
- Open `docs/product-context-legacy.md` only when detailed historical product context is needed.
- The preserved former contract is `docs/agents/agent-contract-legacy.md`.

## Work
- Keep changes focused and preserve the existing Next.js patterns.
- Validate changed frontend files with `npx eslint <changed-files>`.
- Run `npx playwright test <spec>` only when a specific affected flow has a named spec.
- Treat `npm run build` and the complete E2E suite as broad validation; run only when requested or justified by broad/high-risk changes.
