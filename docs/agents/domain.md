# Domain Docs

This is a single-context repository.

## Before exploring

Read:

- `CONTEXT.md` at the repository root.
- Relevant architectural decision records under `docs/adr/`.

If either location does not exist, proceed silently. Domain-modeling skills create or extend these files when terminology or decisions are resolved.

## Layout

/
├── CONTEXT.md
├── docs/
│   ├── agents/
│   └── adr/
└── app/

## Vocabulary

Use the terms defined in `CONTEXT.md` in issue titles, implementation plans, test names, refactor proposals, and documentation.

Do not silently replace defined concepts with plausible synonyms. If a required concept is missing, determine whether the new language is unnecessary or whether the glossary needs an explicit addition.

## Architectural decisions

If proposed work conflicts with an existing ADR, surface that conflict explicitly instead of silently overriding the decision.
