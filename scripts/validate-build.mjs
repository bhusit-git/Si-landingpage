import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "../src/config/site.js";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const errors = [];

const forbiddenExtensions = new Set([
  ".doc",
  ".docm",
  ".docx",
  ".dot",
  ".dotm",
  ".dotx",
  ".key",
  ".numbers",
  ".odp",
  ".ods",
  ".odt",
  ".pages",
  ".pdf",
  ".pot",
  ".potm",
  ".potx",
  ".pps",
  ".ppsm",
  ".ppsx",
  ".ppt",
  ".pptm",
  ".pptx",
  ".pub",
  ".rtf",
  ".vsd",
  ".vsdx",
  ".xls",
  ".xlsb",
  ".xlsm",
  ".xlsx",
  ".xlt",
  ".xltm",
  ".xltx",
]);

function fail(message) {
  errors.push(message);
}

async function walk(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path.join(directory, entry.name), relative)));
    } else if (entry.isFile()) {
      files.push(relative);
    }
  }

  return files;
}

function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

function decodeHtml(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, token) => {
    if (token[0] !== "#") return named[token.toLowerCase()] ?? entity;

    const hexadecimal = token[1]?.toLowerCase() === "x";
    const codePoint = Number.parseInt(token.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
    try {
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    } catch {
      return entity;
    }
  });
}

function normalizeText(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function parseAttributes(tag) {
  const attributes = new Map();
  const firstWhitespace = tag.search(/\s/);
  if (firstWhitespace === -1) return attributes;

  const source = tag.slice(firstWhitespace, tag.lastIndexOf(">"));
  const expression = /([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of source.matchAll(expression)) {
    attributes.set(match[1].toLowerCase(), decodeHtml(match[2] ?? match[3] ?? match[4] ?? ""));
  }
  return attributes;
}

function tags(html, tagName) {
  const expression = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return [...html.matchAll(expression)].map((match) => parseAttributes(match[0]));
}

function describePage(relativePath) {
  return `/${relativePath}`;
}

function pageUrlPath(relativePath) {
  if (relativePath === "index.html") return "/";
  if (relativePath.endsWith("/index.html")) {
    return `/${relativePath.slice(0, -"index.html".length)}`;
  }
  if (relativePath.endsWith(".html")) {
    return `/${relativePath.slice(0, -".html".length)}/`;
  }
  return `/${relativePath}`;
}

function safeDecodePathname(pathname) {
  try {
    return decodeURIComponent(pathname);
  } catch {
    return pathname;
  }
}

function targetCandidates(pathname) {
  const decoded = safeDecodePathname(pathname);
  const clean = path.posix.normalize(`/${decoded}`).replace(/^\/+/, "");
  if (!clean) return ["index.html"];

  if (decoded.endsWith("/")) {
    const withoutSlash = clean.replace(/\/$/, "");
    return [`${withoutSlash}/index.html`, `${withoutSlash}.html`];
  }

  if (path.posix.extname(clean)) return [clean];
  return [clean, `${clean}.html`, `${clean}/index.html`];
}

function explicitRedirectSources(text) {
  const sources = new Set();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [source] = trimmed.split(/\s+/);
    if (source && !source.includes("*") && !source.includes(":")) sources.add(source);
  }
  return sources;
}

function internalReferences(html) {
  const references = [];
  const expression = /<(?:a|area|audio|iframe|img|link|script|source|video)\b[^>]*>/gi;

  for (const match of html.matchAll(expression)) {
    const attributes = parseAttributes(match[0]);
    for (const name of ["href", "src"]) {
      const value = attributes.get(name)?.trim();
      if (value) references.push(value);
    }

    const srcset = attributes.get("srcset");
    if (srcset) {
      for (const candidate of srcset.split(",")) {
        const value = candidate.trim().split(/\s+/)[0];
        if (value) references.push(value);
      }
    }
  }

  return references;
}

function anchorNames(html) {
  const anchors = new Set();
  for (const match of html.matchAll(/<[a-z][^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    for (const name of ["id", "name"]) {
      const value = attributes.get(name);
      if (value) anchors.add(value);
    }
  }
  return anchors;
}

function addUnique(seen, value, label, relativePath) {
  if (!value) return;
  const key = value.toLocaleLowerCase("th");
  const previous = seen.get(key);
  if (previous) {
    fail(`${describePage(relativePath)} duplicates ${label} from ${describePage(previous)}: ${value}`);
  } else {
    seen.set(key, relativePath);
  }
}

async function validate() {
  let files;
  try {
    files = await walk(distDir);
  } catch (error) {
    console.error(`Build validation failed: cannot read ${distDir}`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
    return;
  }

  const fileSet = new Set(files);
  for (const required of ["404.html", "robots.txt"]) {
    if (!fileSet.has(required)) fail(`Missing required build artifact: /${required}`);
  }

  const sitemapFiles = files.filter((file) => /^sitemap(?:[-\w]*)?\.xml$/i.test(file));
  if (sitemapFiles.length === 0) fail("Missing required sitemap XML artifact");

  const forbiddenFiles = files.filter((file) => forbiddenExtensions.has(path.extname(file).toLowerCase()));
  for (const file of forbiddenFiles) {
    fail(`Public source document is not allowed in dist: /${file}`);
  }

  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const thaiHtmlFiles = htmlFiles.filter((file) => file.startsWith("th/"));
  if (thaiHtmlFiles.length === 0) fail("No Thai HTML pages were generated under /th/");

  const pages = new Map();
  for (const file of htmlFiles) {
    const html = stripComments(await readFile(path.join(distDir, file), "utf8"));
    pages.set(file, {
      anchors: anchorNames(html),
      html,
      references: internalReferences(html),
      urlPath: pageUrlPath(file),
    });

    if (site.productionReady && /\b(?:pending|placeholder|tbd|todo)\b|รอยืนยัน/iu.test(html)) {
      fail(`${describePage(file)} contains a placeholder while productionReady is true`);
    }
  }

  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Map();
  const canonicalOrigins = new Set();

  for (const file of thaiHtmlFiles) {
    const page = pages.get(file);
    const { html } = page;

    const htmlElements = tags(html, "html");
    const language = htmlElements[0]?.get("lang")?.trim().toLowerCase();
    if (htmlElements.length !== 1 || language !== "th") {
      fail(`${describePage(file)} must contain one <html lang="th"> element`);
    }

    const h1Count = (html.match(/<h1\b[^>]*>/gi) ?? []).length;
    if (h1Count !== 1) fail(`${describePage(file)} has ${h1Count} H1 elements; expected exactly 1`);

    if (/<form\b[^>]*>/i.test(html)) fail(`${describePage(file)} contains a form; phase 1 must be form-free`);

    const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    const title = titleMatches.length === 1 ? normalizeText(titleMatches[0][1]) : "";
    if (titleMatches.length !== 1 || !title) {
      fail(`${describePage(file)} must contain one non-empty <title>`);
    } else {
      addUnique(titles, title, "title", file);
    }

    const descriptionTags = tags(html, "meta").filter(
      (attributes) => attributes.get("name")?.trim().toLowerCase() === "description",
    );
    const description = descriptionTags.length === 1 ? descriptionTags[0].get("content")?.trim() : "";
    if (descriptionTags.length !== 1 || !description) {
      fail(`${describePage(file)} must contain one non-empty meta description`);
    } else {
      addUnique(descriptions, description, "meta description", file);
    }

    const canonicalTags = tags(html, "link").filter((attributes) =>
      (attributes.get("rel") ?? "")
        .toLowerCase()
        .split(/\s+/)
        .includes("canonical"),
    );
    const canonical = canonicalTags.length === 1 ? canonicalTags[0].get("href")?.trim() : "";
    if (canonicalTags.length !== 1 || !canonical) {
      fail(`${describePage(file)} must contain one canonical link`);
    } else {
      try {
        const url = new URL(canonical);
        if (!/^https?:$/.test(url.protocol)) throw new Error("canonical URL must use HTTP(S)");
        if (!url.pathname.endsWith("/")) {
          fail(`${describePage(file)} canonical must end in a trailing slash: ${canonical}`);
        }
        canonicalOrigins.add(url.origin);
        addUnique(canonicals, url.href, "canonical URL", file);
        page.canonical = url;
      } catch (error) {
        fail(`${describePage(file)} has an invalid canonical URL: ${canonical}`);
      }
    }
  }

  if (canonicalOrigins.size > 1) {
    fail(`Thai canonicals use multiple origins: ${[...canonicalOrigins].sort().join(", ")}`);
  }

  const redirects = fileSet.has("_redirects")
    ? explicitRedirectSources(await readFile(path.join(distDir, "_redirects"), "utf8"))
    : new Set();
  let checkedReferences = 0;

  for (const [file, page] of pages) {
    const fallbackBase = `https://build.internal${page.urlPath}`;
    const base = page.canonical?.href ?? fallbackBase;

    for (const rawReference of page.references) {
      if (/^(?:data|mailto|sms|tel|blob):/i.test(rawReference)) continue;
      if (rawReference.startsWith("//")) {
        fail(`${describePage(file)} contains a protocol-relative URL: ${rawReference}`);
        continue;
      }
      if (rawReference.includes("\\")) {
        fail(`${describePage(file)} contains a backslash URL that browsers may resolve off-origin: ${rawReference}`);
        continue;
      }
      if (/[\u0000-\u0020\u007f]/.test(rawReference)) {
        fail(`${describePage(file)} contains raw whitespace or a control character in a URL: ${rawReference}`);
        continue;
      }

      let url;
      try {
        url = new URL(rawReference, base);
      } catch {
        fail(`${describePage(file)} contains an invalid URL: ${rawReference}`);
        continue;
      }

      if (!/^https?:$/.test(url.protocol)) continue;
      const explicitlyAbsolute = /^[a-z][a-z\d+.-]*:/i.test(rawReference) || rawReference.startsWith("//");
      const baseOrigin = new URL(base).origin;
      if (rawReference.startsWith("/") && url.origin !== baseOrigin) {
        fail(`${describePage(file)} contains a root-relative URL that resolves off-origin: ${rawReference}`);
        continue;
      }
      const sameOrigin = explicitlyAbsolute
        ? canonicalOrigins.has(url.origin)
        : url.origin === baseOrigin;
      if (!sameOrigin) continue;

      checkedReferences += 1;
      const candidates = targetCandidates(url.pathname);
      const targetFile = candidates.find((candidate) => fileSet.has(candidate));
      if (!targetFile) {
        if (redirects.has(url.pathname)) continue;
        fail(`${describePage(file)} links to missing internal target: ${rawReference}`);
        continue;
      }

      if (url.hash && targetFile.endsWith(".html")) {
        const fragment = safeDecodePathname(url.hash.slice(1));
        if (fragment && !pages.get(targetFile)?.anchors.has(fragment)) {
          fail(`${describePage(file)} links to missing anchor ${url.hash} in /${targetFile}`);
        }
      }
    }
  }

  const summary = [
    `Files scanned: ${files.length}`,
    `Thai HTML pages: ${thaiHtmlFiles.length}`,
    `Unique titles/descriptions/canonicals: ${titles.size}/${descriptions.size}/${canonicals.size}`,
    `Same-origin references checked: ${checkedReferences}`,
    `Sitemap files: ${sitemapFiles.length}`,
    `Forbidden public documents: ${forbiddenFiles.length}`,
    `Production placeholder scan: ${site.productionReady ? "enforced" : "skipped (preview mode)"}`,
  ];

  console.log("Build validation summary");
  for (const line of summary) console.log(`- ${line}`);

  if (errors.length > 0) {
    console.error(`\nBuild validation failed with ${errors.length} error${errors.length === 1 ? "" : "s"}:`);
    for (const [index, error] of errors.entries()) console.error(`${index + 1}. ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log("\nBuild validation passed.");
}

await validate();
