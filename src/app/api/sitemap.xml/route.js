import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";

const BASE_URL = "https://channelincome.com";
// 24 hours cache
const CACHE_DURATION = 1000 * 60 * 60 * 24;

let cachedSitemap = null;
let lastGenerated = 0;

export async function GET(req) {
  const now = Date.now();

  // ✅ Serve cached sitemap if within 24 hours
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

  // Static pages
  const staticPages = [
    "/",
    "/guide",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/terms-of-service",
    "/disclaimer",
  ];

  // Start XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
                     xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                     xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
                     xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">`;

  // Add static pages
  staticPages.forEach((page) => {
    sitemap += `
      <url>
        <loc>${BASE_URL}${page}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  });

  // Add dynamic guides
  guides.forEach((guide) => {
    sitemap += `
      <url>
        <loc>${BASE_URL}/guide/${guide.slug}</loc>
        <lastmod>${guide.updatedAt.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  });

  sitemap += `</urlset>`;

  // Cache sitemap
  cachedSitemap = sitemap;
  lastGenerated = now;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": `s-maxage=86400, stale-while-revalidate=59`,
    },
  });
}
