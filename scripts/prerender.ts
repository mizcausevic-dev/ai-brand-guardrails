import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

import {
  renderDocs,
  renderOutputReview,
  renderOverview,
  renderPolicyLane,
  renderVerification
} from "../src/services/render";

const siteDir = join(process.cwd(), "site");

mkdirSync(siteDir, { recursive: true });

const routes = [
  { path: "index.html", content: renderOverview() },
  { path: "policy-lane/index.html", content: renderPolicyLane() },
  { path: "output-review/index.html", content: renderOutputReview() },
  { path: "verification/index.html", content: renderVerification() },
  { path: "docs/index.html", content: renderDocs() }
];

for (const route of routes) {
  const output = join(siteDir, route.path);
  mkdirSync(join(output, ".."), { recursive: true });
  writeFileSync(output, route.content, "utf8");
}

writeFileSync(
  join(siteDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: http://brand.kineticgain.com/sitemap.xml\n`,
  "utf8"
);

writeFileSync(
  join(siteDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>http://brand.kineticgain.com/</loc></url>\n  <url><loc>http://brand.kineticgain.com/policy-lane/</loc></url>\n  <url><loc>http://brand.kineticgain.com/output-review/</loc></url>\n  <url><loc>http://brand.kineticgain.com/verification/</loc></url>\n  <url><loc>http://brand.kineticgain.com/docs/</loc></url>\n</urlset>\n`,
  "utf8"
);
