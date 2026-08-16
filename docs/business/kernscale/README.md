# Kernscale business documentation

This directory keeps Kernscale research and funding material separate from the personal-site documentation.

- `gsa/planning/`: grant strategy, implementation plans, and design decisions
- `gsa/application/`: canonical Markdown drafts used for the GSA application
- `gsa/research/`: funding-program and market research supporting the application
- `gsa/output/`: generated Word working drafts
- `research/`: broader Kernscale research not specific to the GSA application

Regenerate the Word drafts from the repository root with:

```bash
python3 scripts/documents/build_gsa_docx.py
```
