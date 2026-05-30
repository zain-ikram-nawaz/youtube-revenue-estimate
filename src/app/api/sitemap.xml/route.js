import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";

const BASE_URL = "https://channelincome.com";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
const LAST_UPDATED = "2026-05-30";

let cachedSitemap = null;
let lastGenerated = 0;

// Priority map — each page gets its correct priority
const staticPageConfig = [
  { path: "/",                              changefreq: "daily",   priority: "1.0" },
  { path: "/tool/youtube-revenue-calculator", changefreq: "weekly",  priority: "0.9" },
  { path: "/guide",                         changefreq: "daily",   priority: "0.8" },
  { path: "/about-us",                      changefreq: "monthly", priority: "0.5" },
  { path: "/contact-us",                    changefreq: "monthly", priority: "0.4" },
  { path: "/privacy-policy",               changefreq: "monthly", priority: "0.3" },
  { path: "/terms-of-service",             changefreq: "monthly", priority: "0.3" },
  { path: "/disclaimer",                   changefreq: "monthly", priority: "0.3" },
];

export async function GET() {
  const now = Date.now();

  // Serve cached sitemap if within 24 hours
  if (cachedSitemap && now - lastGenerated < CACHE_DURATION) {
    return new Response(cachedSitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": `s-maxage=86400, stale-while-revalidate=59`,
      },
    });
  }

  await connectDB();

  const guides = await Guide.find({}).sort({ updatedAt: -1 });

  // Build XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                     xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                     xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
                     xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">`;

  // Add static pages with correct priorities
  staticPageConfig.forEach(({ path, changefreq, priority }) => {
    sitemap += `
      <url>
        <loc>${BASE_URL}${path}</loc>
        <lastmod>${LAST_UPDATED}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>
    `;
  });

  // Add dynamic guides — higher priority for fresh content
  guides.forEach((guide) => {
    sitemap += `
      <url>
        <loc>${BASE_URL}/guide/${guide.slug}</loc>
        <lastmod>${guide.updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  });

  sitemap += `</urlset>`;

  // Cache it
  cachedSitemap = sitemap;
  lastGenerated = now;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `s-maxage=86400, stale-while-revalidate=59`,
    },
  });
}
