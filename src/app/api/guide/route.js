import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import cloudinary from "../../lib/cloudinary";

// 🔹 Safe JSON parser
function safeParse(value, fallback = []) {
  try {
    return JSON.parse(value);
  } catch {
    if (typeof value === "string" && value.trim()) return [value];
    return fallback;
  }
}

// 🔹 Slug generator
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// 🔹 Upload & compress image to Cloudinary
async function uploadImage(file, folderName = "guides") {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
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

// ✅ POST — Create new Guide
export async function POST(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    // 🏷️ Basic Fields
    const title = formData.get("title");
    const category = formData.get("category");
    const author = formData.get("author") || "Admin";
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const summary = formData.get("summary");
    const excerpt = formData.get("excerpt");
    const readTime = Number(formData.get("readTime")) || undefined;

    // 📦 Parse JSON / string arrays safely
    const tags = safeParse(formData.get("tags"));
    const keywords = safeParse(formData.get("keywords"));
    const faqs = safeParse(formData.get("faqs"));
    const blocks = safeParse(formData.get("blocks"));

    // 🖼️ Handle Thumbnail Upload
    let thumbnailUrl = "";
    const thumbnailFile = formData.get("thumbnail");
    if (thumbnailFile && thumbnailFile.size > 0) {
      thumbnailUrl = await uploadImage(thumbnailFile, "thumbnails");
    }

    // 🧱 Handle Block Images + Tables
    const processedBlocks = await Promise.all(
      blocks.map(async (block) => {
        // 🖼️ If block is image
        if (block.type === "image" && block.file) {
          const fileObj = formData.get(block.file);
          if (fileObj && fileObj.size > 0) {
            const imageUrl = await uploadImage(fileObj, "guide-blocks");
            return { ...block, file: imageUrl };
          }
        }

        // 📋 If block is table, ensure rows are 2D array
        if (block.type === "table") {
          if (typeof block.rows === "string") {
            try {
              block.rows = JSON.parse(block.rows);
            } catch {
              block.rows = [[block.rows]]; // fallback
            }
          }
        }

        return block;
      })
    );

    // ✅ Create slug
    const slug = generateSlug(title);

    // ✅ Save to DB
    const newGuide = await Guide.create({
      title,
      slug,
      category,
      author,
      metaTitle,
      metaDescription,
      summary,
      excerpt,
      tags,
      keywords,
      readTime,
      thumbnail: thumbnailUrl,
      blocks: processedBlocks,
      faqs,
    });

    return NextResponse.json({ success: true, guide: newGuide });
  } catch (error) {
    console.error("Error saving guide:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

// ✅ GET — Fetch all guides
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;

    const totalGuides = await Guide.countDocuments();
    const guides = await Guide.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      guides,
      pagination: {
        totalGuides,
        totalPages: Math.ceil(totalGuides / limit),
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
