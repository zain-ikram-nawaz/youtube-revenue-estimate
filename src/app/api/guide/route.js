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

    // Parse JSON arrays
    const tags = JSON.parse(formData.get("tags") || "[]");
    const keywords = JSON.parse(formData.get("keywords") || "[]");

    const file = formData.get("image");
    let imageUrl = "";

    // ✅ Upload to Cloudinary
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
    });

    return NextResponse.json({ success: true, guide });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// ✅ GET — All guides
export async function GET() {
  try {
    await connectDB();
    const guides = await Guide.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, guides });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
