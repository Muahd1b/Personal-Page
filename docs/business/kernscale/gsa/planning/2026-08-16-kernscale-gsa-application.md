# Kernscale GSA Application Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a complete, evidence-backed GSA project-idea and application package for Jonas Knüppel's Kernscale Media Intelligence Loop.

**Architecture:** Build one canonical application dossier from verified personal/company evidence, the approved product design, Dashboard repository evidence, primary-source market research, customer validation, and a consistent financial model. Derive the GSA form answers, expert-opinion brief, and jury scorecard from that dossier so facts and numbers are maintained once.

**Tech Stack:** Markdown source documents, official GSA forms/PDFs, spreadsheet-compatible financial tables, Kernscale Dashboard repository evidence, official provider and competitor documentation.

## Global Constraints

- Do not state an implementation or funding timeline until Jonas explicitly approves it.
- Do not present UI studies, static metrics, provider enums, or planned integrations as productive features.
- Applicant is Jonas Knüppel as a natural person; Kernscale UG (haftungsbeschränkt) in Gründung is the business vehicle.
- Preserve the 50/50 shareholder and joint-managing-director structure unless the executed corporate documents differ.
- Keep every customer, source, artifact, and recommendation workspace-scoped.
- Treat AI output as draft material requiring human approval.
- Use only evidence that Jonas may lawfully disclose; redact private customer and financial data in shareable versions.
- Do not contact customers, experts, the GSA, or another external party without explicit authorization.
- Do not submit the project idea or application without a final factual review and explicit submission authorization.
- Use the current GSA program page, current amendments, July 2026 expert-opinion guidance, and July 2026 jury criteria as the authoritative program sources.

---

## Planned File Structure

- `docs/business/kernscale/gsa/application/00-application-index.md`: canonical status, ownership, and dependency map.
- `docs/business/kernscale/gsa/application/01-eligibility-and-company-evidence.md`: applicant and UG evidence register.
- `docs/business/kernscale/gsa/application/02-project-idea.md`: concise project-idea narrative for the GSA form.
- `docs/business/kernscale/gsa/application/03-business-concept.md`: complete company and venture concept.
- `docs/business/kernscale/gsa/application/04-product-and-innovation.md`: existing baseline, new development, architecture, risks, and validation.
- `docs/business/kernscale/gsa/application/05-market-and-competition.md`: target market, demand evidence, competitors, and differentiation matrix.
- `docs/business/kernscale/gsa/application/06-customer-validation.md`: anonymized evidence from four existing customers and future pilot validation.
- `docs/business/kernscale/gsa/application/07-financial-model.md`: assumptions and GSA-compatible investment, revenue, liquidity, and financing tables.
- `docs/business/kernscale/gsa/application/08-expert-opinion-brief.md`: brief and evidence pack for a qualified external expert.
- `docs/business/kernscale/gsa/application/09-jury-scorecard.md`: evidence-to-criterion mapping and gap register.
- `docs/business/kernscale/gsa/application/10-gsa-form-map.md`: exact mapping from canonical dossier fields into the current GSA PDF.
- `docs/business/kernscale/gsa/application/11-submission-checklist.md`: signatures, annexes, electronic transfer, post, and final controls.

### Task 1: Establish The Canonical Application Index

**Files:**
- Create: `docs/business/kernscale/gsa/application/00-application-index.md`
- Read: `docs/business/kernscale/gsa/planning/2026-08-16-kernscale-gsa-gruendungsstipendium-design.md`
- Read: `docs/business/kernscale/gsa/research/gsa-gruendungsstipendium.md`

**Interfaces:**
- Consumes: approved application design and current GSA research.
- Produces: one status table listing every required document, owner, evidence dependency, and review state.

- [ ] Create the dossier directory and application index with sections for program status, canonical facts, document register, evidence register, open decisions, external actions, and submission gate.
- [ ] Copy only approved facts from the design; label user-supplied facts as `self-reported` until documentary evidence is reviewed.
- [ ] Record time planning, pricing, forecasts, pilot selection, expert selection, and final project name as deliberate decision tasks rather than hidden placeholders.
- [ ] Run `rg -n "decision required|evidence required|unverified" docs/business/kernscale/gsa/application/00-application-index.md` and confirm every match names its owner and resolution action.
- [ ] Commit the index independently.

### Task 2: Verify Eligibility And Corporate Evidence

**Files:**
- Create: `docs/business/kernscale/gsa/application/01-eligibility-and-company-evidence.md`
- Update: `docs/business/kernscale/gsa/application/00-application-index.md`

**Interfaces:**
- Consumes: identity, residence, activity, and UG formation documents supplied by Jonas.
- Produces: verified eligibility matrix and annex inventory used by every subsequent document.

- [ ] Record proof required for age, MV main residence, planned MV business seat, main activity, 50/50 participation, joint management, and the legally relevant formation date.
- [ ] Compare the executed articles, notarial formation documents, commercial-register state, tax/trade registration, and public imprint; record discrepancies without altering source documents.
- [ ] Determine which company date the GSA should use for the twelve-month rule and flag it for written GSA confirmation if the documents do not make the answer clear.
- [ ] Record whether Jonas receives another stipend, SGB II/III benefit, or incompatible public livelihood support.
- [ ] Record the CV evidence demonstrating technical and commercial suitability without inventing credentials or results.
- [ ] Update the application index only after each fact has a named supporting document.

### Task 3: Capture The Existing Product Baseline

**Files:**
- Create: `docs/business/kernscale/gsa/application/04-product-and-innovation.md`
- Read: `/Users/jonasknppel/Businesses/Kernscale/Kernscale (Data)/Kernscale-Dashboard/CONTEXT-MAP.md`
- Read: `/Users/jonasknppel/Businesses/Kernscale/Kernscale (Data)/Kernscale-Dashboard/docs/plans/active-feature-roadmap.md`
- Read: `/Users/jonasknppel/Businesses/Kernscale/Kernscale (Data)/Kernscale-Dashboard/docs/architecture/kernscale-intelligence-engine.md`
- Read: `/Users/jonasknppel/Businesses/Kernscale/Kernscale (Data)/Kernscale-Dashboard/app/Models/WorkspaceSource.php`
- Read: `/Users/jonasknppel/Businesses/Kernscale/Kernscale (Data)/Kernscale-Dashboard/resources/js/components/layout/domain-shell.tsx`
- Read: `/Users/jonasknppel/Businesses/Kernscale/Kernscale (Data)/Kernscale-Dashboard/resources/js/pages/dashboard/page.tsx`

**Interfaces:**
- Consumes: current repository state and approved product design.
- Produces: three-way feature inventory: `implemented`, `specified/UI study`, and `planned in grant project`.

- [ ] Record the exact Dashboard commit reviewed and preserve the existing dirty-worktree status without changing Dashboard files.
- [ ] Document the real workspace, data-source, artifact, signal, review, knowledge, recommendation, and decision foundations.
- [ ] Document that the current extractor is rule-based and that named providers are source classifications rather than proof of live integrations.
- [ ] Identify hard-coded Dashboard metrics and placeholder domain pages so they cannot enter the application as current capabilities.
- [ ] Define the grant development boundary: real connectors, media context model, AI analysis/generation, managed media workflow, outcome snapshots, and reviewed learning loop.
- [ ] Add a technical-risk table covering API availability, data quality, tenant isolation, AI reliability, onboarding complexity, and overbroad connector scope.

### Task 4: Build The Market And Competition Evidence

**Files:**
- Create: `docs/business/kernscale/gsa/application/05-market-and-competition.md`
- Update: `docs/business/kernscale/gsa/application/09-jury-scorecard.md`

**Interfaces:**
- Consumes: official product documentation from selected competitors and source-backed market data.
- Produces: target-market definition, competitor matrix, and defensible differentiation claims.

- [ ] Define the initial customer profile using observable characteristics: local KMU or service business, multiple disconnected media channels, limited in-house marketing/data capacity, and willingness to grant controlled data access.
- [ ] Select representative competitors from agency services, social publishing, analytics/reporting, CRM/automation, and generative marketing software.
- [ ] Capture for every competitor the supported data sources, persistent brand context, cross-channel analysis, generation, human service, outcome feedback, pricing model, and SME onboarding burden using first-party sources.
- [ ] Write the differentiation without claiming that Kernscale invented analytics, content generation, dashboards, or marketing automation.
- [ ] Add direct source links and an access date next to every competitive claim.
- [ ] Map the finished evidence to the GSA market-potential, competition, market-analysis, and market-development criteria.

### Task 5: Document Customer Validation Without Overclaiming

**Files:**
- Create: `docs/business/kernscale/gsa/application/06-customer-validation.md`
- Update: `docs/business/kernscale/gsa/application/03-business-concept.md`
- Update: `docs/business/kernscale/gsa/application/09-jury-scorecard.md`

**Interfaces:**
- Consumes: invoices/contracts, delivery evidence, and interview notes for four existing customers.
- Produces: anonymized market-access evidence and a separate validation plan for the new product.

- [ ] Record each existing customer's sector, purchased service category, problem, delivery scope, and payment evidence without exposing unnecessary identifying details.
- [ ] State explicitly that the four customers bought websites/accounts or related services, not the completed Media Intelligence Loop.
- [ ] Extract repeated pain points only when supported by notes, correspondence, or customer confirmation.
- [ ] Draft a pilot/letter-of-intent request that asks about data access, desired outcome, willingness to test, and willingness to pay; do not send it without authorization.
- [ ] Define product-validation evidence as signed pilot intent, observed use, measured outcome, and commercial conversion rather than informal interest alone.

### Task 6: Draft The Canonical Project Idea And Business Concept

**Files:**
- Create: `docs/business/kernscale/gsa/application/02-project-idea.md`
- Create: `docs/business/kernscale/gsa/application/03-business-concept.md`
- Read: `docs/business/kernscale/gsa/application/01-eligibility-and-company-evidence.md`
- Read: `docs/business/kernscale/gsa/application/04-product-and-innovation.md`
- Read: `docs/business/kernscale/gsa/application/05-market-and-competition.md`
- Read: `docs/business/kernscale/gsa/application/06-customer-validation.md`

**Interfaces:**
- Consumes: verified facts and all evidence modules.
- Produces: concise GSA narrative and full source narrative for form answers and annexes.

- [ ] Write the project idea in the order problem, target group, solution, innovation, existing baseline, new development, business model, team, market evidence, feasibility, risks, and expected economic effect.
- [ ] Write the complete business concept with company structure, service/platform operating model, sales path, customer onboarding, revenue logic, operations, data governance, and sustainability.
- [ ] Keep the project idea shorter than the business concept and eliminate duplicate claims by linking both to the same evidence identifiers.
- [ ] Apply consistent terms: `Media Intelligence Loop`, `workspace`, `context basis`, `signal`, `recommendation`, `human approval`, and `learning record`.
- [ ] Run a claim audit: every number, customer statement, implemented feature, and competitor statement must link to evidence or be removed.

### Task 7: Decide Product Scope, Sequence, And Success Measures

**Files:**
- Update: `docs/business/kernscale/gsa/application/04-product-and-innovation.md`
- Update: `docs/business/kernscale/gsa/application/03-business-concept.md`
- Update: `docs/business/kernscale/gsa/application/00-application-index.md`

**Interfaces:**
- Consumes: approved priorities from Jonas and evidence from the Dashboard baseline.
- Produces: product work packages, approved sequence, validation gates, and measurable completion criteria.

- [ ] Choose the initial direct connectors and the integrations handled through import, using API stability and customer demand as the decision criteria.
- [ ] Define completion criteria for ingestion, context modeling, analysis, generation, review, outcome measurement, and learning without tying them to dates yet.
- [ ] Define pilot acceptance measures for data reliability, output quality, time saving, usability, continued usage, willingness to pay, and selected business outcomes.
- [ ] In a separate approved planning session, assign durations and dependencies to the completed work packages.
- [ ] Record the approved timing only after Jonas confirms it; keep all earlier documents duration-neutral until then.

### Task 8: Build The Financial Model

**Files:**
- Create: `docs/business/kernscale/gsa/application/07-financial-model.md`
- Update: `docs/business/kernscale/gsa/application/03-business-concept.md`
- Update: `docs/business/kernscale/gsa/application/09-jury-scorecard.md`

**Interfaces:**
- Consumes: actual opening costs, founder resources, current customer revenue, approved pricing, sales assumptions, and product work packages.
- Produces: internally consistent investment, revenue, profitability, liquidity, and financing plans.

- [ ] Collect current cash, committed capital, formation costs, recurring operating costs, founder withdrawals, taxes/social insurance assumptions, tooling, hosting, legal/accounting, sales, and development expenses.
- [ ] Approve setup fee, monthly platform fee, monthly managed-service fee, optional production revenue, payment timing, and churn assumptions.
- [ ] Build base, downside, and upside cases using one shared assumption table.
- [ ] Reconcile revenue, profitability, liquidity, and financing tables so opening cash, monthly movements, and closing cash agree exactly.
- [ ] Keep the stipend as livelihood support and do not misclassify it as customer revenue.
- [ ] Verify that the base case supports a credible full-time livelihood beyond the funding period.

### Task 9: Prepare The Expert-Opinion Package

**Files:**
- Create: `docs/business/kernscale/gsa/application/08-expert-opinion-brief.md`
- Read: `docs/business/kernscale/gsa/application/04-product-and-innovation.md`
- Read: `docs/business/kernscale/gsa/application/05-market-and-competition.md`

**Interfaces:**
- Consumes: product architecture, prototype evidence, competitor matrix, risks, and expected growth effects.
- Produces: a short brief matching the GSA's July 2026 expert-opinion questions.

- [ ] Summarize the current state of technology and representative regional and national alternatives.
- [ ] Explain the specific improvement and system-level differentiation without promotional exaggeration.
- [ ] Document technical risks, synergies, growth potential, and potential employment effects.
- [ ] Attach a non-confidential architecture diagram, feature-state inventory, and prototype screenshots.
- [ ] Shortlist qualified universities or other suitable institutions; do not contact them without authorization.
- [ ] Provide the expert with questions to answer independently rather than a prewritten endorsement to sign.

### Task 10: Score The Package Against The Jury Criteria

**Files:**
- Create: `docs/business/kernscale/gsa/application/09-jury-scorecard.md`
- Read: all dossier modules.

**Interfaces:**
- Consumes: completed evidence and narrative modules.
- Produces: criterion-by-criterion evidence map, conservative provisional score, and blocking-gap list.

- [ ] Create one row for each of the ten published criteria and the separate full-time-livelihood gate.
- [ ] Link every proposed score to evidence, not writing quality alone.
- [ ] Score conservatively using `0`, `1`, `2`, or `3`; record what evidence would raise each non-maximal score.
- [ ] Treat an unverified high innovation claim, missing expert opinion, missing financial consistency, or missing legal eligibility evidence as a submission blocker.
- [ ] Require a defensible score above the 20-point minimum before requesting final submission approval.

### Task 11: Map The Current GSA Form And Assemble The Submission

**Files:**
- Create: `docs/business/kernscale/gsa/application/10-gsa-form-map.md`
- Create: `docs/business/kernscale/gsa/application/11-submission-checklist.md`
- Read: all dossier modules.

**Interfaces:**
- Consumes: current GSA Project Idea PDF and completed canonical dossier.
- Produces: field-by-field form answers, annex list, signature checklist, and controlled submission package.

- [ ] With explicit authorization, request the current GSA Project Idea PDF using Jonas's approved email address.
- [ ] Record every form field, character limit, required attachment, signature, electronic-send step, and postal-original requirement.
- [ ] Map every form field to a canonical dossier section and shorten copy without changing facts or numbers.
- [ ] Validate that the electronic PDF and printed copy contain identical information.
- [ ] Confirm the residence certificate, CV, business concept, expert opinion, corporate evidence, and financial tables are current and consistently named.
- [ ] Run a final factual, legal-name, date, amount, signature, and annex check.
- [ ] Present the complete package for Jonas's approval; submit electronically and by post only after explicit authorization.

## Self-Review Record

- Spec coverage: eligibility, product, Dashboard baseline, innovation, market, customers, finance, expert opinion, jury criteria, form mapping, and controlled submission are each assigned to a task.
- Timing constraint: sequencing is a named decision task; no unapproved duration is embedded in the application content.
- Claim boundary: current code, UI studies, planned features, and customer history are explicitly separated.
- External-write boundary: outreach, form request, and submission each require explicit authorization.
- Placeholder scan: open decisions are expressed as executable collection or approval steps rather than hidden placeholders.
