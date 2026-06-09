# AI Brand Guardrails

Board-ready Kinetic Gain surface for enforcing brand tone, factual posture, PII stripping, and approval readiness across AI-generated marketing content.

- Live: [http://brand.kineticgain.com/](http://brand.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/ai-brand-guardrails](https://github.com/mizcausevic-dev/ai-brand-guardrails)

## What this product does

AI Brand Guardrails turns generated content into a governed launch artifact. It connects brand safety, factual proof, privacy review, and campaign readiness so AI-assisted copy can move quickly without becoming a legal, revenue, or trust problem after publish.

- **SaaS go-to-market analyst view:** checks whether AI-generated claims, CTAs, and channel-specific copy stay aligned with campaign strategy, buyer segment, and approved positioning.
- **SaaS value architect view:** reduces rework and reputation risk by turning content defects into visible operating costs: legal review delays, rewritten campaigns, brand inconsistency, unsupported proof, and customer-data exposure.
- **Technical reviewer view:** makes guardrails inspectable through policy specimens, output verdicts, JSON endpoints, screenshots, smoke checks, and prerendered routes.
- **Executive narrative:** frames AI content governance as launch safety. The product is not about slowing teams down; it is about preventing confident-looking AI output from creating brand, compliance, or revenue-system damage.

## What these repos have in common

This repo follows the broader Kinetic Gain pattern: turn invisible operating risk into decision evidence. Each surface names the risk, maps the owner, exposes the control plane, and gives leaders and builders the same artifact to inspect.

## Operating workflow

- **Before generation:** define the approved voice, claim rules, redaction policy, and approval lane.
- **During review:** classify each draft as healthy, watch, or blocked with a clear remediation reason.
- **Before launch:** preserve the policy artifacts, output verdicts, screenshots, and JSON proof that explain why the content is safe to ship.

## What it shows

- policy controls for tone, proof, privacy, and approval posture
- modeled output review decisions across campaign, email, and landing-page channels
- concrete policy artifacts for brand tone, PII redaction, and human approval workflow
- operator verification for AI-assisted release safety

## Screenshots

### Overview

![Overview proof](./screenshots/01-overview-proof.png)

### Policy Lane

![Policy lane proof](./screenshots/02-policy-lane-proof.png)

### Output Review

![Output review proof](./screenshots/03-output-review-proof.png)

## Routes

- `/`
- `/policy-lane`
- `/output-review`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/policy-lane`
- `/api/output-review`
- `/api/policy-artifacts`
- `/api/verification`
- `/api/sample`

## Local development

```powershell
cd ai-brand-guardrails
npm install
npm run dev
```

Then open:

- `http://127.0.0.1:5418/`
- `http://127.0.0.1:5418/policy-lane`
- `http://127.0.0.1:5418/output-review`
- `http://127.0.0.1:5418/verification`
- `http://127.0.0.1:5418/docs`

## Validation

```powershell
npm run verify
npm run prerender
npm run render:assets
```

## Documentation

- [docs/architecture.md](./docs/architecture.md)
- [docs/ORIGIN.md](./docs/ORIGIN.md)
