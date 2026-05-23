import { fileSamples, policyArtifacts, policyChecks, reviewOutputs } from "../data/sampleBrandPolicy";

export function summary() {
  const healthy = policyChecks.filter((item) => item.health === "healthy").length;
  const attention = policyChecks.filter((item) => item.health !== "healthy").length;
  const blockedOutputs = reviewOutputs.filter((item) => item.health === "critical").length;

  return {
    policyCount: policyChecks.length,
    healthy,
    attention,
    blockedOutputs,
    artifactCount: policyArtifacts.length,
    recommendation:
      "Treat AI publishing as a brand-risk surface, because one unsupported claim or PII leak can erase the trust that pipeline teams are working to earn."
  };
}

export function policyLane() {
  return policyChecks;
}

export function outputReview() {
  return reviewOutputs;
}

export function artifacts() {
  return policyArtifacts.map((artifact) => ({
    ...artifact,
    sample: fileSamples[artifact.path]
  }));
}

export function verification() {
  return [
    "The repo treats AI outputs as governed release artifacts rather than instant-publish copy blocks.",
    "Brand tone, claim substantiation, and PII redaction are modeled as one operator surface instead of separate review queues.",
    "The approval path makes it obvious when legal, content, or revenue owners need to block release."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    policyLane: policyLane(),
    outputReview: outputReview(),
    artifacts: artifacts(),
    verification: verification()
  };
}
