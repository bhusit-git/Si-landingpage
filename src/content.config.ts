import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const commonFields = {
  title: z.string().min(1).max(80),
  description: z.string().min(40).max(180),
  eyebrow: z.string().min(1),
  hero: z.string().min(1),
  ctaLabel: z.string().min(1),
  ctaHref: z
    .string()
    .regex(
      /^\/(?!\/)[^\\\s\u0000-\u001f\u007f]*$/,
      "ctaHref must be a same-origin path beginning with one slash and contain no backslashes or whitespace",
    ),
  indexable: z.boolean().default(true),
  draft: z.boolean().default(false),
};

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/pages" }),
  schema: z.object(commonFields),
});

const products = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/products" }),
  schema: z.object({
    ...commonFields,
    brand: z.enum(["Super Ice", "ICEBERG"]),
    summary: z.string().min(1),
    features: z.array(z.string()).min(1),
    suitableFor: z.array(z.string()).min(1),
    sourceDocument: z.string().min(1),
    sourceLocator: z.string().min(1),
    copyApproved: z.boolean().default(false),
    imageApproved: z.boolean().default(false),
  }),
});

const solutions = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/solutions" }),
  schema: z.object({
    ...commonFields,
    concerns: z.array(z.string()).min(1),
    outcomes: z.array(z.string()).min(1),
  }),
});

const knowledge = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/knowledge" }),
  schema: z.object({
    ...commonFields,
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().optional(),
    reviewer: z.string().optional(),
  }),
});

export const collections = { pages, products, solutions, knowledge };
