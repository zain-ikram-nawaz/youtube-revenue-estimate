import { cache } from 'react';
import { connectDB } from '../lib/db';
import Guide from '../../models/guide';

export const getGuides = cache(async (page = 1, limit = 8) => {
  try {
    await connectDB();

    // Parallel execution: Dono kaam ek sath honge
    const [totalGuides, rawGuides] = await Promise.all([
      Guide.countDocuments(),
      Guide.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
    ]);

    return {
      guides: rawGuides.map((g) => ({
        ...g,
        _id: g._id.toString(),
        createdAt: g.createdAt?.toISOString(),
        updatedAt: g.updatedAt?.toISOString(),
      })),
      pagination: {
        totalGuides,
        totalPages: Math.ceil(totalGuides / limit),
        currentPage: page,
        perPage: limit,
      },
    };
  } catch (error) {
    console.error("Database Error:", error);
    return { guides: [], pagination: { totalPages: 0, currentPage: 1 } };
  }
});