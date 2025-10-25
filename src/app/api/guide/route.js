import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";

// 🔹 Slug generator
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// ✅ POST — Create new guide
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const author = formData.get("author");
    const category = formData.get("category");
    const summary = formData.get("summary");
    const readTime = Number(formData.get("readTime")) || undefined;

    // ✅ Parse JSON arrays
    const tags = JSON.parse(formData.get("tags") || "[]");
    const keywords = JSON.parse(formData.get("keywords") || "[]");

    // ✅ Parse FAQs
    const faqs = JSON.parse(formData.get("faqs") || "[]");

    // ✅ Handle image upload
    const file = formData.get("image");
    let imageUrl = "";

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "guides",
            transformation: [
              { width: 1200, height: 800, crop: "limit" },
              { quality: "auto:good" },
              { fetch_format: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(buffer);
      });
    }

    // ✅ Create guide
    const slug = generateSlug(title);
    const guide = await Guide.create({
      title,
      slug,
      content,
      image: imageUrl,
      metaTitle,
      metaDescription,
      tags,
      category,
      summary,
      keywords,
      readTime,
      author,
      faqs, // ✅ Save FAQs array
    });

    return NextResponse.json({ success: true, guide });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}


export async function GET(req) {
  try {
    await connectDB();

    // ✅ Query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;

    // ✅ Count total guides
    const totalGuides = await Guide.countDocuments();

    // ✅ Fetch paginated guides
    const guides = await Guide.find()
      .sort({ createdAt: -1 })      // newest first
      .skip((page - 1) * limit)     // skip previous pages
      .limit(limit)                  // limit per page
      .lean();

    const totalPages = Math.ceil(totalGuides / limit);

    return NextResponse.json({
      success: true,
      guides,
      pagination: {
        totalGuides,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
