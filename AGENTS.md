# AGENTS.md

## Purpose
Repository-level instruction contract for coding agents.
This file is vendor-neutral and intended to work across multiple agent tools.

## Working Model
- Keep orchestration state inside `.orchestration/`.
- Default to one primary lane owner (`frontend|backend|data|docs|qa`).
- Add support lanes only when diffs/docs prove cross-cutting impact.

## Session Flow
1. Intake (read-only): objective, constraints, lane impact, risk.
2. Discovery in parallel: repo map, diff analysis, docs drift scan.
3. Adaptive acknowledgment:
   - low: no ack
   - medium: no ack
   - high: `ack execute`
   - critical: `ack execute`, `ack release`
4. Execution: minimal complete implementation by primary lane.
5. Validation:
   - fast local pre-commit: lint changed files, typecheck touched package(s), targeted tests
   - full suite async CI
6. Report: changed files, checks run, skipped checks, residual risk.

## Guardrails
- Evaluate policy guardrails before destructive or tenant-sensitive operations.
- Guardrail policy lives in `.orchestration/policy/guardrails.rego`.
- Policy input file lives in `.orchestration/policy/input.json`.
- Multi-tenant repos must enforce `workspace_id` filtering and `X-Workspace-ID` transport.

## Standard Commands
- Init run:
  - `/Users/jonasknppel/.codex/agent-fabric/scripts/init-issue-orchestration.sh <issue_id> "<issue_title>" [issue_description] [--risk <low|medium|high|critical>]`
- Ack stages:
  - `/Users/jonasknppel/.codex/agent-fabric/scripts/ack-issue-orchestration.sh <run_id> "ack execute|ack release"`
- Evaluate policy guardrails:
  - `/Users/jonasknppel/.codex/agent-fabric/scripts/evaluate-guardrails.sh [--risk <low|medium|high|critical>]`
