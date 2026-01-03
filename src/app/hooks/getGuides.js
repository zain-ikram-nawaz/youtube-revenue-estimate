import { connectDB } from "../lib/db"; // aapka DB connect function
import Guide from "../../models/guide";

// ✅ Ye function DB se guides fetch karega
export async function getGuides(page = 1, limit = 8) {
  await connectDB(); // DB connect

  const totalGuides = await Guide.countDocuments();
  const guides = await Guide.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

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
