import { artifacts, outputReview, policyLane, summary, verification } from "./brandGuardrailsService";

function pageShell(title: string, activeRoute: string, body: string) {
  const nav = [
    { href: "/", label: "Overview & Export" },
    { href: "/policy-lane", label: "Policy Lane" },
    { href: "/output-review", label: "Output Review" },
    { href: "/verification", label: "Operator Verification" },
    { href: "/docs", label: "Integration Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #09101d;
      --border: rgba(148, 163, 184, 0.18);
      --text: #e7eefb;
      --muted: #9eb1cf;
      --amber: #fbbf24;
      --mono: "IBM Plex Mono", Consolas, monospace;
      --sans: "IBM Plex Sans", "Segoe UI", sans-serif;
      --serif: "IBM Plex Serif", Georgia, serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--sans);
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.16), transparent 24%),
        radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), transparent 18%),
        var(--bg);
      color: var(--text);
    }
    .wrap { width: min(1360px, calc(100% - 48px)); margin: 24px auto 48px; }
    .hero {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: 24px;
      padding: 26px 32px;
      border: 1px solid var(--border);
      border-radius: 28px;
      background: rgba(9, 16, 29, 0.84);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
    }
    .eyebrow, .panel-label, .kicker, .tab, .status-pill, .mini {
      font-family: var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .eyebrow {
      display: inline-flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 13px;
    }
    .eyebrow strong {
      color: #7db5ff;
      border: 1px solid rgba(59,130,246,0.35);
      padding: 9px 14px;
      border-radius: 8px;
    }
    h1 {
      margin: 0 0 10px;
      font-family: var(--serif);
      font-size: clamp(48px, 5vw, 70px);
      line-height: 0.98;
    }
    h1 span {
      background: linear-gradient(90deg, #60a5fa, #34d399);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .lede {
      margin: 0;
      max-width: 980px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
    }
    .posture {
      border: 1px solid var(--border);
      border-radius: 20px;
      background: rgba(15, 23, 42, 0.9);
      padding: 28px 24px;
      align-self: start;
    }
    .posture .panel-label { color: #91a3c6; font-size: 12px; margin-bottom: 14px; }
    .posture .status-line { font-size: 15px; font-family: var(--mono); font-weight: 600; }
    .tabs { display: flex; flex-wrap: wrap; gap: 16px; margin: 22px 0 34px; }
    .tab {
      display: inline-flex;
      align-items: center;
      padding: 17px 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: #93a7c7;
      background: rgba(15, 23, 42, 0.8);
      font-size: 14px;
      text-decoration: none;
    }
    .tab.active {
      color: white;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: rgba(59,130,246,0.55);
      box-shadow: 0 18px 36px rgba(37, 99, 235, 0.3);
    }
    .section-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
    .card {
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid var(--border);
      border-radius: 26px;
      padding: 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    .metric { grid-column: span 3; min-height: 170px; }
    .metric .value { font-size: 60px; font-weight: 700; line-height: 1; margin: 22px 0 8px; }
    .metric .panel-label { color: #78b4ff; font-size: 12px; }
    .metric p, .section-copy, .policy-item p, .review-item p, .artifact p, .verify-list li, .spec-box p {
      margin: 0;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.6;
    }
    .highlight { grid-column: 1 / -1; border-color: rgba(251, 191, 36, 0.2); }
    .highlight .kicker { color: var(--amber); font-size: 13px; }
    .highlight h2 { margin: 12px 0 10px; font-size: 26px; line-height: 1.35; }
    .split-left { grid-column: span 7; }
    .split-right { grid-column: span 5; }
    .section-title { margin: 10px 0 10px; font-size: 24px; }
    .policy-list, .review-list, .artifact-list, .verify-list { display: grid; gap: 16px; }
    .policy-item, .review-item, .artifact {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 22px;
      background: rgba(18, 29, 51, 0.62);
    }
    .node-top { display: flex; justify-content: space-between; gap: 18px; align-items: start; }
    .policy-item h3, .review-item h3, .artifact h3 { margin: 10px 0 10px; font-size: 25px; }
    .status-pill {
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .healthy { color: #34d399; border-color: rgba(16,185,129,0.32); background: rgba(16,185,129,0.12); }
    .watch { color: #fbbf24; border-color: rgba(251,191,36,0.26); background: rgba(251,191,36,0.1); }
    .critical { color: #fb7185; border-color: rgba(251,113,133,0.24); background: rgba(251,113,133,0.1); }
    .mini { font-size: 12px; color: #78a8ff; margin-bottom: 12px; }
    .artifact pre, .review-item pre {
      margin: 16px 0 0;
      padding: 18px;
      border-radius: 16px;
      overflow: auto;
      background: #0a1327;
      color: #c4d6f5;
      border: 1px solid rgba(148, 163, 184, 0.12);
      font-family: var(--mono);
      font-size: 14px;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .docs-note { display: grid; grid-template-columns: 1.25fr 0.85fr; gap: 24px; }
    .spec-box {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 24px;
      background: rgba(18, 29, 51, 0.6);
    }
    .spec-box strong { display: block; margin-bottom: 12px; font-size: 16px; }
    code { color: #9cc6ff; font-family: var(--mono); }
    @media (max-width: 1100px) {
      .hero, .docs-note { grid-template-columns: 1fr; }
      .metric { grid-column: span 6; }
      .split-left, .split-right { grid-column: 1 / -1; }
    }
    @media (max-width: 720px) {
      .wrap { width: min(100% - 24px, 100%); }
      .hero, .card { padding: 22px; }
      .metric { grid-column: 1 / -1; }
      .tabs { gap: 12px; }
      .tab { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow"><strong>Kinetic Gain</strong><span>• AI Output Control Plane</span></div>
        <h1>AI Brand <span>Guardrails</span></h1>
        <p class="lede">Governed publishing surface for AI-assisted marketing output: tone integrity, claim substantiation, PII stripping, and human approval readiness before copy touches live campaigns.</p>
      </div>
      <aside class="posture">
        <div class="panel-label">Operator Posture</div>
        <div class="status-line">● Revenue + Brand + Legal Review</div>
      </aside>
    </section>

    <nav class="tabs">
      ${nav.map((item) => `<a class="tab ${item.href === activeRoute ? "active" : ""}" href="${item.href}">${item.label}</a>`).join("")}
    </nav>

    ${body}
  </div>
</body>
</html>`;
}

function statusClass(status: string) {
  if (status === "healthy") return "healthy";
  if (status === "watch") return "watch";
  return "critical";
}

export function renderOverview() {
  const dashboard = summary();
  const samples = artifacts().slice(0, 2);

  return pageShell(
    "AI Brand Guardrails",
    "/",
    `<section>
      <div class="section-grid">
        <article class="card metric"><div class="panel-label">Policy Checks</div><div class="value">${dashboard.policyCount}</div><p>Guardrails modeled across tone, proof, privacy, and release approval.</p></article>
        <article class="card metric"><div class="panel-label">Healthy & Attention</div><div class="value">${dashboard.healthy}<span style="font-size:28px;color:#fbbf24;"> / ${dashboard.attention}</span></div><p>Healthy vs attention-required controls before AI content can ship.</p></article>
        <article class="card metric"><div class="panel-label">Blocked Outputs</div><div class="value">${dashboard.blockedOutputs}</div><p>Drafts currently blocked for critical issues like PII leakage or unsupported claims.</p></article>
        <article class="card metric"><div class="panel-label">Policy Files</div><div class="value">${dashboard.artifactCount}</div><p>Specimens covering tone constraints, redaction posture, and approval workflow rules.</p></article>

        <article class="card highlight">
          <div class="kicker">Critical release recommendation</div>
          <h2>"${dashboard.recommendation}"</h2>
          <p>Best use case: revenue teams moving fast with AI-assisted content but needing a clear operator lane before outbound copy, landing pages, or nurture drafts go live.</p>
        </article>

        <article class="card split-left">
          <div class="panel-label">Policy Surface</div>
          <h2 class="section-title">Turn brand safety into a release system.</h2>
          <p class="section-copy">This control plane treats AI copy as a governed artifact with explicit owners, rules, and block conditions instead of a fast draft with vague review expectations.</p>
          <div class="policy-list">
            ${policyLane()
              .slice(0, 3)
              .map(
                (item) => `<div class="policy-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${item.owner}</div>
                      <h3>${item.name}</h3>
                    </div>
                    <span class="status-pill ${statusClass(item.health)}">${item.health}</span>
                  </div>
                  <p>${item.rule}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Policy Artifacts</div>
          <h2 class="section-title">Release-ready policy specimens.</h2>
          <p class="section-copy">Concrete guardrail files keep AI publishing rules observable across brand, legal, and revenue teams.</p>
          <div class="artifact-list">
            ${samples
              .map(
                (artifact) => `<div class="artifact">
                  <div class="mini">${artifact.category}</div>
                  <h3>${artifact.path}</h3>
                  <p>${artifact.summary}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderPolicyLane() {
  return pageShell(
    "AI Brand Guardrails - Policy Lane",
    "/policy-lane",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Policy Lane</div>
          <h2 class="section-title">Every AI publishing rule needs an owner and a release consequence.</h2>
          <p class="section-copy">The lane below models how brand, content, legal, and security concerns translate into explicit operator rules before outbound content reaches buyers.</p>
          <div class="policy-list">
            ${policyLane()
              .map(
                (item) => `<div class="policy-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${item.id} • ${item.owner}</div>
                      <h3>${item.name}</h3>
                    </div>
                    <span class="status-pill ${statusClass(item.health)}">${item.health}</span>
                  </div>
                  <p><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Rule</strong>${item.rule}</p>
                  <p style="margin-top:12px;"><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Risk</strong>${item.risk}</p>
                </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Guardrail Goals</div>
          <h2 class="section-title">What this lane protects.</h2>
          <div class="verify-list">
            <li>Keep generated copy inside the approved voice and CTA envelope.</li>
            <li>Prevent unsupported claims from leaking into public-facing content.</li>
            <li>Catch customer-identifying details before they leave an internal context.</li>
            <li>Make human approval a visible operational checkpoint instead of an assumption.</li>
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderOutputReview() {
  return pageShell(
    "AI Brand Guardrails - Output Review",
    "/output-review",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Output Review</div>
          <h2 class="section-title">Review model outputs like release candidates, not copy suggestions.</h2>
          <p class="section-copy">These samples show how the guardrails classify real marketing drafts before they enter a launch lane.</p>
          <div class="review-list">
            ${outputReview()
              .map(
                (item) => `<div class="review-item">
                  <div class="node-top">
                    <div>
                      <div class="mini">${item.id} • ${item.channel}</div>
                      <h3>${item.verdict}</h3>
                    </div>
                    <span class="status-pill ${statusClass(item.health)}">${item.health}</span>
                  </div>
                  <p><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Issue</strong>${item.issueSummary}</p>
                  <p style="margin-top:12px;"><strong style="display:block;color:#d8e6ff;margin-bottom:8px;">Remediation</strong>${item.remediation}</p>
                  <pre>${item.excerpt}</pre>
                </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Policy Artifacts</div>
          <h2 class="section-title">Files behind the review verdicts.</h2>
          <div class="artifact-list">
            ${artifacts()
              .map(
                (artifact) => `<div class="artifact">
                  <div class="mini">${artifact.category}</div>
                  <h3>${artifact.path}</h3>
                  <p>${artifact.summary}</p>
                  <pre>${artifact.sample}</pre>
                </div>`
              )
              .join("")}
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderVerification() {
  return pageShell(
    "AI Brand Guardrails - Verification",
    "/verification",
    `<section>
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Verification</div>
          <h2 class="section-title">What this repo proves.</h2>
          <div class="verify-list">
            ${verification().map((item) => `<li>${item}</li>`).join("")}
          </div>
        </article>
        <article class="card split-right">
          <div class="panel-label">Operator Checkpoints</div>
          <div class="verify-list">
            <li>Every AI draft can surface an explicit policy verdict before export.</li>
            <li>Critical issues are modeled as release blockers, not optional comments.</li>
            <li>Artifacts are inspectable and map cleanly to the review decisions.</li>
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderDocs() {
  return pageShell(
    "AI Brand Guardrails - Docs",
    "/docs",
    `<section>
      <div class="section-grid docs-note">
        <article class="card">
          <div class="panel-label">System Artifact / Principal Technical Spec</div>
          <h2 class="section-title" style="font-size:48px; line-height:1.06;">AI Publishing Guardrails Architecture</h2>
          <p class="section-copy">How to keep AI-assisted marketing output fast without losing tone discipline, factual posture, or privacy safety.</p>
          <div class="spec-box">
            <strong>Primary purpose</strong>
            <p>The <code>ai-brand-guardrails</code> repo models the review layer that sits between model output and launch-ready copy. It makes brand, legal, privacy, and revenue signoff explicit instead of implied.</p>
          </div>
          <div class="spec-box" style="margin-top:18px;">
            <strong>Application shape mapping</strong>
            <p><code>src/app.ts</code> hosts HTML diagnostics and JSON review endpoints. <code>policies/</code> contains the specimen rules that drive approval and blocking posture.</p>
          </div>
        </article>
        <aside class="card">
          <div class="panel-label">Spec Classification</div>
          <div class="verify-list">
            <li><strong style="display:block;color:#d8e6ff;">Target platform</strong>Node.js Web Runtime (Express / Vite-friendly)</li>
            <li><strong style="display:block;color:#d8e6ff;">Architecture role</strong>Director of Web & GTM Systems</li>
            <li><strong style="display:block;color:#34d399;">Signal metric target</strong>95% Conversion Coherence</li>
            <li><strong style="display:block;color:#d8e6ff;">Active focus</strong>AI content safety, brand consistency, proof posture, privacy review</li>
          </div>
        </aside>
      </div>
    </section>`
  );
}
