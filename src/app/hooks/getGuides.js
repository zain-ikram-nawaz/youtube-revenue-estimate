import { connectDB } from "../lib/db"; // aapka DB connect function
import Guide from "../../models/guide";

export async function getGuides(page = 1, limit = 8) {
  await connectDB();

  const totalGuides = await Guide.countDocuments();

  const guides = (await Guide.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
  ).map((g) => ({
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
}
