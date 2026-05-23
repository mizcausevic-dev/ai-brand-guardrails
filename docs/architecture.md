# AI Brand Guardrails Architecture

`ai-brand-guardrails` models the governed review layer that sits between AI-generated marketing content and production release. It turns tone, proof, privacy, and approval requirements into one operator surface.

## Core surfaces

- `Overview`
  - dashboard summary of healthy vs attention-required guardrails
- `Policy Lane`
  - rule-by-rule view of tone, substantiation, privacy, and approval posture
- `Output Review`
  - modeled draft outputs with verdicts, remediation paths, and blocked examples
- `Verification`
  - concise proof of what the repo demonstrates
- `Docs`
  - architecture explanation and policy specimen context

## Artifact model

- `policies/brand-tone-policy.yml`
- `policies/pii-redaction-policy.yml`
- `policies/approval-workflow.yml`

These artifacts anchor the HTML views and API payloads, giving the repo a concrete AI publishing control surface rather than a vague prompt-ops dashboard.
