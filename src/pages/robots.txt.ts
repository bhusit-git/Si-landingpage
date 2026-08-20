import type { APIRoute } from "astro";
import site from "../config/site.js";

export const prerender = true;

const policyRule = (crawler: "GPTBot" | "ClaudeBot" | "Google-Extended") => {
  const policy = site.aiCrawlerPolicies[crawler];
  const directive = policy === "allow" ? "Allow: /" : "Disallow: /";
  const note = policy === "pending" ? "# Policy pending owner approval; fail-closed for preview." : "";
  return [`User-agent: ${crawler}`, directive, note].filter(Boolean).join("\n");
};

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("sitemap.xml", `${site.canonicalOrigin}/`).toString();

  const body = site.productionReady
    ? [
        "User-agent: *",
        "Allow: /",
        "",
        "User-agent: OAI-SearchBot",
        "Allow: /",
        "",
        "User-agent: ChatGPT-User",
        "Allow: /",
        "",
        "User-agent: Claude-SearchBot",
        "Allow: /",
        "",
        "User-agent: Claude-User",
        "Allow: /",
        "",
        policyRule("GPTBot"),
        "",
        policyRule("ClaudeBot"),
        "",
        policyRule("Google-Extended"),
        "",
        `Sitemap: ${sitemapUrl}`,
      ].join("\n")
    : [
        "# Internal review build: crawling disabled until production configuration is approved.",
        "User-agent: *",
        "Disallow: /",
        "",
        policyRule("GPTBot"),
        "",
        policyRule("ClaudeBot"),
        "",
        policyRule("Google-Extended"),
        "",
        `Sitemap: ${sitemapUrl}`,
      ].join("\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
