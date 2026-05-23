import { outputReview, summary } from "../src/services/brandGuardrailsService";

console.log("ai-brand-guardrails demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(outputReview(), null, 2));
