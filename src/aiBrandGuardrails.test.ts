import { describe, expect, it } from "vitest";

import { artifacts, outputReview, payload, policyLane, summary } from "./services/brandGuardrailsService";

describe("ai-brand-guardrails", () => {
  it("summary exposes brand policy posture", () => {
    const result = summary();

    expect(result.policyCount).toBeGreaterThan(0);
    expect(result.artifactCount).toBeGreaterThan(0);
    expect(result.recommendation).toContain("brand-risk");
  });

  it("policy lane and output review stay concrete", () => {
    expect(policyLane().some((item) => item.name.toLowerCase().includes("tone"))).toBe(true);
    expect(outputReview().some((item) => item.channel.toLowerCase().includes("linkedin"))).toBe(true);
    expect(artifacts().some((artifact) => artifact.path.includes("policy"))).toBe(true);
  });

  it("payload bundles the full AI release surface", () => {
    const result = payload();

    expect(result.dashboard.policyCount).toBe(result.policyLane.length);
    expect(result.outputReview.length).toBeGreaterThan(0);
    expect(result.artifacts.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
