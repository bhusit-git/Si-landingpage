import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import site from "../config/site.js";

export const prerender = true;

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '\"': "&quot;",
    };
    return entities[character];
  });

export const GET: APIRoute = async () => {
  const [pages, products, solutions] = await Promise.all([
    getCollection("pages", ({ data }) => data.indexable && !data.draft),
    getCollection("products", ({ data }) => data.indexable && data.copyApproved && !data.draft),
    getCollection("solutions", ({ data }) => data.indexable && !data.draft),
  ]);

  const paths = site.productionReady
    ? [
        "/th/",
        "/th/products/",
        "/th/super-ice/",
        "/th/iceberg/",
        ...pages.map((entry) => `/th/${entry.id}/`),
        ...products.map((entry) => `/th/products/${entry.id}/`),
        ...solutions.map((entry) => `/th/solutions/${entry.id}/`),
      ]
    : [];

  const urls = [...new Set(paths)]
    .sort()
    .map((path) => `<url><loc>${escapeXml(new URL(path.slice(1), `${site.canonicalOrigin}/`).toString())}</loc></url>`)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
