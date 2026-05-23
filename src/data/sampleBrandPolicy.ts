export type Health = "healthy" | "watch" | "critical";

export const policyChecks = [
  {
    id: "pol-01",
    name: "Brand tone integrity",
    health: "healthy" as Health,
    owner: "brand-ops",
    rule: "Require approved tone profile, banned phrasing checks, and CTA alignment before channel export.",
    risk: "Tone drift weakens trust and makes demand-gen campaigns feel inconsistent across touchpoints."
  },
  {
    id: "pol-02",
    name: "Claim substantiation",
    health: "watch" as Health,
    owner: "content-strategy",
    rule: "Block unsupported performance, pricing, or customer proof claims unless source references are attached.",
    risk: "AI can produce fluent but unearned certainty that creates legal and revenue risk."
  },
  {
    id: "pol-03",
    name: "PII redaction posture",
    health: "critical" as Health,
    owner: "security-review",
    rule: "Strip names, emails, phone numbers, and customer identifiers before outbound draft approval.",
    risk: "A single leaked identity or contact record can turn a marketing automation win into an incident."
  },
  {
    id: "pol-04",
    name: "Regulated wording controls",
    health: "healthy" as Health,
    owner: "legal-review",
    rule: "Flag superlatives, guarantee language, and compliance-sensitive wording for human escalation.",
    risk: "Aggressive claims can overpromise and create avoidable procurement or legal friction."
  },
  {
    id: "pol-05",
    name: "Human approval readiness",
    health: "watch" as Health,
    owner: "revenue-ops",
    rule: "Do not release channel-ready copy until content, legal, and revenue owners have a shared verdict trail.",
    risk: "Fast shipping without shared signoff breaks accountability when copy underperforms or misstates value."
  }
];

export const reviewOutputs = [
  {
    id: "out-01",
    channel: "LinkedIn campaign",
    health: "watch" as Health,
    verdict: "Needs sourcing",
    issueSummary: "The draft promises a 42% conversion uplift without attaching a source note or approved proof object.",
    remediation: "Replace the numeric claim with sourced case-study language or route it to legal review.",
    excerpt: "Our AI workflow increased conversion by 42% across every channel."
  },
  {
    id: "out-02",
    channel: "Email nurture",
    health: "critical" as Health,
    verdict: "Blocked for PII",
    issueSummary: "The output copied a customer contact name and email from a support transcript into a nurture draft.",
    remediation: "Redact the contact record, rotate to role-based language, and re-run approval checks.",
    excerpt: "Hi Sarah Kim, since you asked last week at sarah.kim@clientco.io..."
  },
  {
    id: "out-03",
    channel: "Landing page hero",
    health: "healthy" as Health,
    verdict: "Ready for approval",
    issueSummary: "Tone, CTA, and proof references match the approved launch brief.",
    remediation: "Proceed to human signoff and publish-lane scheduling.",
    excerpt: "Ship safer AI content with review-ready policy gates for tone, proof, and privacy."
  }
];

export const policyArtifacts = [
  {
    path: "policies/brand-tone-policy.yml",
    category: "Tone policy",
    summary: "Approved voice constraints, banned phrases, CTA posture, and escalation cues."
  },
  {
    path: "policies/pii-redaction-policy.yml",
    category: "PII posture",
    summary: "Redaction rules for identities, contact records, account data, and customer transcript fragments."
  },
  {
    path: "policies/approval-workflow.yml",
    category: "Approval workflow",
    summary: "Owner signoff, escalation path, and release-block rules before AI copy can ship."
  }
];

export const fileSamples: Record<string, string> = {
  "policies/brand-tone-policy.yml": `voice_profile:\n  style: decisive\n  audience: revenue_and_marketing_ops\nbanned_phrases:\n  - guaranteed results\n  - frictionless for everyone\ncta_rules:\n  require_clear_next_step: true\n  disallow_false_urgency: true\n`,
  "policies/pii-redaction-policy.yml": `redact:\n  - person_name\n  - email\n  - phone\n  - account_id\n  - support_ticket_reference\nreview_action:\n  pii_detected: block_release\n`,
  "policies/approval-workflow.yml": `stages:\n  - model_output\n  - policy_review\n  - human_approval\n  - release\napprovals:\n  human_approval:\n    - content_ops\n    - legal_review\n    - revenue_ops\nblockers:\n  - unsupported_claim\n  - pii_detected\n  - tone_mismatch\n`
};
