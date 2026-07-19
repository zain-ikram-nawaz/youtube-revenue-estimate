import { connectDB } from "../lib/db";
import Guide from "../../models/guide";

export async function getRelatedGuides({ slug, tags = [], category, limit = 3 }) {
  await connectDB();

  const or = [];
  if (tags.length) or.push({ tags: { $in: tags } });
  if (category) or.push({ category });

  const query = { slug: { $ne: slug }, status: "published" };
  if (or.length) query.$or = or;

  let guides = await Guide.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();

  // Backfill with most recent guides if not enough tag/category matches
  if (guides.length < limit) {
    const excludeSlugs = [slug, ...guides.map((g) => g.slug)];
    const extra = await Guide.find({ slug: { $nin: excludeSlugs }, status: "published" })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit - guides.length)
      .lean();
    guides = [...guides, ...extra];
  }

  return guides.map((g) => ({
    ...g,
    _id: g._id.toString(),
    createdAt: g.createdAt?.toISOString(),
    updatedAt: g.updatedAt?.toISOString(),
  }));
}
