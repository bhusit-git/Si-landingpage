import { defineConfig } from "astro/config";
import site from "./src/config/site.js";

export default defineConfig({
  site: site.canonicalOrigin,
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
