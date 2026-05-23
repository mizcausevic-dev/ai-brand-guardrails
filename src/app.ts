import express from "express";

import { artifacts, outputReview, payload, policyLane, summary, verification } from "./services/brandGuardrailsService";
import { renderDocs, renderOutputReview, renderOverview, renderPolicyLane, renderVerification } from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5418);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/policy-lane", (_req, res) => res.type("html").send(renderPolicyLane()));
app.get("/output-review", (_req, res) => res.type("html").send(renderOutputReview()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/policy-lane", (_req, res) => res.json(policyLane()));
app.get("/api/output-review", (_req, res) => res.json(outputReview()));
app.get("/api/policy-artifacts", (_req, res) => res.json(artifacts()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`AI Brand Guardrails listening on http://127.0.0.1:${port}`);
  });
}

export default app;
