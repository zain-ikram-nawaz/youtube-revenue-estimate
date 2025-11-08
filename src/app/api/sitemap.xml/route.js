import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";

const BASE_URL = "https://channelincome.com";
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours

let cachedSitemap = null;
let lastGenerated = 0;

export async function GET() {
  const now = Date.now();

  // ✅ Serve cached sitemap if not older than 24 hours
  if (cachedSitemap && now - lastGenerated < CACHE_DURATION) {
    return new Response(cachedSitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=59",
      },
    });
  }

  await connectDB();

  const guides = await Guide.find({}, "slug updatedAt").sort({ updatedAt: -1 });

  // ✅ Static routes
  const staticPages = [
    "/",
    "/guide",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/terms-of-service",
    "/disclaimer",
  ];

  // ✅ Build sitemap XML
  const urls = [
    ...staticPages.map(
      (path) => `
      <url>
        <loc>${BASE_URL}${path}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>`
    ),
    ...guides.map(
      (guide) => `
      <url>
        <loc>${BASE_URL}/guide/${guide.slug}</loc>
        <lastmod>${guide.updatedAt.toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>`
    ),
  ].join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
          xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
          xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
    ${urls}
  </urlset>`;

  // ✅ Cache sitemap in memory
  cachedSitemap = sitemap;
  lastGenerated = now;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=59",
    },
  });
}
