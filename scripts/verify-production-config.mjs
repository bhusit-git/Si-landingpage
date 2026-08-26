import { site } from "../src/config/site.js";
import { readFile, readdir } from "node:fs/promises";

const errors = [];

function configured(value) {
  if (typeof value !== "string") return false;
  const normalized = value.trim();
  return (
    normalized.length > 0 &&
    !/(?:pending|todo|tbd|replace[ -]?me|change[ -]?me|รอยืนยัน|ตัวอย่าง)/i.test(normalized)
  );
}

function requireConfigured(label, value) {
  if (!configured(value)) errors.push(`${label} is not configured`);
}

if (site.productionReady !== true) {
  errors.push("productionReady must be explicitly set to true");
}

const canonicalOrigin = typeof site.canonicalOrigin === "string" ? site.canonicalOrigin.trim() : "";
let canonicalHostname = "";
try {
  const url = new URL(canonicalOrigin);
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  canonicalHostname = hostname;
  const isReserved =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".example") ||
    hostname.endsWith(".invalid") ||
    /^(?:www\.)?example\.(?:com|net|org)$/.test(hostname) ||
    hostname === "0.0.0.0" ||
    hostname.startsWith("127.") ||
    hostname === "::1" ||
    hostname === "[::1]";

  if (url.protocol !== "https:") errors.push("canonicalOrigin must use HTTPS");
  if (isReserved) errors.push("canonicalOrigin must not use a reserved or local hostname");
  if (
    canonicalOrigin.replace(/\/+$/, "") !== url.origin ||
    url.pathname !== "/" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    errors.push("canonicalOrigin must contain only the scheme and hostname, without a path, query, or hash");
  }
} catch {
  errors.push("canonicalOrigin must be a valid absolute URL");
}

requireConfigured("contact.line", site.contact?.line);
requireConfigured("company.legalName", site.company?.legalName);
requireConfigured("company.address", site.company?.address);

const canonicalHostPolicy =
  typeof site.canonicalHostPolicy === "string" ? site.canonicalHostPolicy.trim().toLowerCase() : "";
if (!new Set(["www", "non-www", "apex"]).has(canonicalHostPolicy)) {
  errors.push("canonicalHostPolicy must be one of: www, non-www, or apex");
} else if (canonicalHostname) {
  const usesWww = canonicalHostname.startsWith("www.");
  if (canonicalHostPolicy === "www" && !usesWww) {
    errors.push("canonicalHostPolicy is www but canonicalOrigin does not use a www hostname");
  }
  if ((canonicalHostPolicy === "non-www" || canonicalHostPolicy === "apex") && usesWww) {
    errors.push("canonicalHostPolicy is non-www/apex but canonicalOrigin uses a www hostname");
  }
}

if (configured(site.contact?.line)) {
  try {
    const lineUrl = new URL(site.contact.line.trim());
    const hostname = lineUrl.hostname.toLowerCase().replace(/\.$/, "");
    const allowedLineHost =
      hostname === "lin.ee" || hostname === "line.me" || hostname.endsWith(".line.me");
    if (lineUrl.protocol !== "https:" || !allowedLineHost || lineUrl.username || lineUrl.password) {
      errors.push("contact.line must be an HTTPS URL on lin.ee or line.me");
    }
  } catch {
    errors.push("contact.line must be a valid absolute LINE URL");
  }
}

const acceptedCrawlerPolicies = new Set(["allow", "disallow"]);
for (const crawler of ["GPTBot", "ClaudeBot", "Google-Extended"]) {
  const policy = site.aiCrawlerPolicies?.[crawler];
  if (!acceptedCrawlerPolicies.has(policy)) {
    errors.push(`aiCrawlerPolicies.${crawler} must be exactly allow or disallow, not pending`);
  }
}

const publicationDecisions = [
  "siteCopyApproved",
  "legalPagesApproved",
  "companyMetricsApproved",
  "deliveryAreasApproved",
  "service247Approved",
  "customerProofApproved",
  "certificatesApproved",
  "sourceImagesApproved",
];
for (const decision of publicationDecisions) {
  if (site.publication?.[decision] !== true) {
    errors.push(`publication.${decision} must be explicitly approved before production`);
  }
}

if (site.analytics?.enabled !== false) {
  errors.push("analytics.enabled must remain false until consent-gated analytics loading is implemented");
}

const productDirectory = new URL("../src/content/products/", import.meta.url);
try {
  const productFiles = (await readdir(productDirectory)).filter((file) => file.endsWith(".md"));
  const approvedProducts = [];

  for (const file of productFiles) {
    const source = await readFile(new URL(file, productDirectory), "utf8");
    const frontmatter = source.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? "";
    const value = (field) =>
      frontmatter.match(new RegExp(`^${field}:\\s*(.+?)\\s*$`, "m"))?.[1]?.replace(/^['\"]|['\"]$/g, "") ?? "";

    if (value("copyApproved") !== "true" || value("indexable") !== "true") continue;

    const product = {
      file,
      brand: value("brand"),
      imageApproved: value("imageApproved") === "true",
    };
    approvedProducts.push(product);
    if (!product.imageApproved) {
      errors.push(`products/${file} must have imageApproved: true before its approved copy can ship`);
    }
  }

  for (const brand of ["Super Ice", "ICEBERG"]) {
    if (!approvedProducts.some((product) => product.brand === brand)) {
      errors.push(`at least one indexable, copy-approved product is required for the ${brand} catalog`);
    }
  }
} catch (error) {
  errors.push(`product approval inventory could not be verified: ${error instanceof Error ? error.message : String(error)}`);
}

if (errors.length > 0) {
  console.error(`Production configuration is not ready (${errors.length} issue${errors.length === 1 ? "" : "s"}):`);
  for (const [index, error] of errors.entries()) console.error(`${index + 1}. ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    "Production configuration verified: canonical host policy, company identity, contacts, crawler policies, and publication decisions are explicit.",
  );
}
