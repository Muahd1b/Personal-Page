# Issue tracker: GitHub

Issues and PRDs for this repository live as GitHub issues in `Muahd1b/Personal-Page`. Use the `gh` CLI for operations.

## Conventions

- Create: `gh issue create --title "..." --body "..."`
- Read: `gh issue view <number> --comments`
- List: `gh issue list --state open --json number,title,body,labels,comments`
- Comment: `gh issue comment <number> --body "..."`
- Apply or remove labels: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`
- Close: `gh issue close <number> --comment "..."`

Infer the repository from `git remote -v`; `gh` does this automatically inside the clone.

## Pull requests as a triage surface

**PRs as a request surface: no.**

Pull requests are not included when the `triage` skill builds its incoming request queue.

GitHub shares one number space across issues and pull requests. If a bare reference such as `#42` is ambiguous, try `gh pr view 42` and fall back to `gh issue view 42`.

## Skill operations

When a skill says “publish to the issue tracker,” create a GitHub issue.

When a skill says “fetch the relevant ticket,” run:

`gh issue view <number> --comments`

## Wayfinding operations

The `wayfinder` skill represents a plan as one map issue with child issues:

- Map issues use the `wayfinder:map` label.
- Child issues use `wayfinder:<type>`, where type is `research`, `prototype`, `grilling`, or `task`.
- Prefer GitHub sub-issues and native issue dependencies when available.
- If those features are unavailable, use task lists and `Blocked by: #<number>` references.
- Claim work with `gh issue edit <number> --add-assignee @me`.
- Resolve work by commenting with the result and closing the child issue.
