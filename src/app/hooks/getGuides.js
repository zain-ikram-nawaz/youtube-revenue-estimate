import { cache } from 'react'
import { connectDB } from '../lib/db'; // ← Ye line check karein, path sahi hona chahiye
import Guide from '../../models/guide'; // Guide model ka import bhi lazmi hai

export const getGuides = cache(async (page = 1, limit = 8) => {  await connectDB();

  // Dono kaam aik sath shuru karein
  const [totalGuides, rawGuides] = await Promise.all([
    Guide.countDocuments(),
    Guide.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
  ]);

  const guides = rawGuides.map((g) => ({
    ...g,
    _id: g._id.toString(),
    createdAt: g.createdAt?.toISOString(),
    updatedAt: g.updatedAt?.toISOString(),
  }));

  return {
    guides,
    pagination: {
      totalGuides,
      totalPages: Math.ceil(totalGuides / limit),
      currentPage: page,
      perPage: limit,
    },
  };
})