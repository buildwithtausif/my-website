// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), "");
const isDev = env.NODE_ENV === "development" || process.env.NODE_ENV === "development";
const siteUrl = env.SITE_URL || (isDev ? "http://localhost:4321" : "https://www.buildwithtausif.in");

console.log(`\n🚀 Environment: ${isDev ? 'development' : 'production'}`);
console.log(`🌍 Configured Site URL: ${siteUrl}\n`);

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx(), sitemap()],
});
