# AI Brand Guardrails

Board-ready Kinetic Gain surface for enforcing brand tone, factual posture, PII stripping, and approval readiness across AI-generated marketing content.

- Live: [http://brand.kineticgain.com/](http://brand.kineticgain.com/)
- Repo: [https://github.com/mizcausevic-dev/ai-brand-guardrails](https://github.com/mizcausevic-dev/ai-brand-guardrails)

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
