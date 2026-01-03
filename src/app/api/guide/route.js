import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import Guide from "../../../models/guide";
import cloudinary from "../../lib/cloudinary";
import { getGuides } from "../../hooks/getGuides";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function safeParse(value, fallback = []) {
  try {
    return JSON.parse(value);
  } catch {
    if (typeof value === "string" && value.trim()) return [value];
    return fallback;
  }
}

// 🔹 Slug generator
// Title se SEO-friendly URL slug (jaise: 'Mera Pehla Guide' se 'mera-pehla-guide') banata hai.
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// 🔹 Upload & compress image to Cloudinary
// Image ko Cloudinary par upload karta hai aur usko optimize (resize/compress) karta hai.
async function uploadImage(file, folderName = "guides") {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        transformation: [
          { width: 1200, height: 800, crop: "limit" }, // Size limit
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
// Naya Guide banane aur DB mein save karne ka function.
export async function POST(req) {
  // ⚠️ Maximum file size limit set ki gayi hai (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  try {
    await connectDB(); // Database se connect karna
    const formData = await req.formData(); // Form data ko receive karna

    // 🏷️ Basic Fields ko FormData se nikalna
    const title = formData.get("title");
    const category = formData.get("category");
    const author = formData.get("author") || "Admin";
    const metaTitle = formData.get("metaTitle");
    const metaDescription = formData.get("metaDescription");
    const summary = formData.get("summary");
    const excerpt = formData.get("excerpt");
    const readTime = Number(formData.get("readTime")) || undefined;

    // 📦 JSON/String arrays ko safely parse karna
    const tags = safeParse(formData.get("tags"));
    const keywords = safeParse(formData.get("keywords"));
    const faqs = safeParse(formData.get("faqs"));
    const blocks = safeParse(formData.get("blocks"));

    // 🖼️ Thumbnail Upload aur Size Check
    let thumbnailUrl = "";
    const thumbnailFile = formData.get("thumbnail");
    if (thumbnailFile && thumbnailFile.size > 0) {
      if (thumbnailFile.size > MAX_FILE_SIZE) {
        // Agar size limit se zyada ho toh error dena
        return NextResponse.json(
          {
            success: false,
            message: "Thumbnail size limit exceeded (max 5MB)."
          },
          { status: 400 }
        );
      }
      thumbnailUrl = await uploadImage(thumbnailFile, "thumbnails");
    }

    // 🧱 Block Images aur Tables ko process karna (Async operation)
    const processedBlocks = await Promise.all(
      blocks.map(async (block) => {
        // 🖼️ Agar block 'image' hai
        if (block.type === "image" && block.file) {
          const fileObj = formData.get(block.file);
          if (fileObj && fileObj.size > 0) {
            if (fileObj.size > MAX_FILE_SIZE) {
              // Agar block image size limit se zyada ho toh error throw karna
              throw new Error(`Block image size limit exceeded (max 5MB).`);
            }
            const imageUrl = await uploadImage(fileObj, "guide-blocks");
            return { ...block, file: imageUrl }; // File URL ko block mein update karna
          }
        }

        // 📋 Agar block 'table' hai, toh rows ko 2D array mein confirm karna
        if (block.type === "table") {
          if (typeof block.rows === "string") {
            try {
              block.rows = JSON.parse(block.rows);
            } catch {
              block.rows = [[block.rows]]; // agar parse na ho toh fallback
            }
          }
        }

        return block;
      })
    );

    // ✅ Slug banana
    const slug = generateSlug(title);

    // ✅ Data ko MongoDB mein save karna
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

    return NextResponse.json({ success: true, guide: newGuide }); // Success response
  } catch (error) {
    console.error("Error saving guide:", error);

    // ⚠️ Agar file size limit ka custom error ho toh usko handle karna
    if (error.message.includes("size limit exceeded")) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400 } // Bad Request
        );
    }

    // Doosre errors ke liye generic response
    return NextResponse.json({
      success: false,
      message: error.message || "An unexpected error occurred while saving the guide.",
    }, { status: 500 }); // Server Error
  }
}

// ✅ GET — Fetch all guides
// Sabhi guides ko fetch karne ka function (pagination ke saath).
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 8);

  const data = await getGuides(page, limit);  // ← shared function
  return Response.json(data);
}