import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db"; // Path adjust karlein
import Guide from "../../../../models/guide"; // Path adjust karlein
import cloudinary from "../../../lib/cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Helper functions (Aap inhe separate file mein bhi rakh sakte hain taake code repeat na ho)
function safeParse(value, fallback = []) {
  try {
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch { return fallback; }
}

function generateSlug(title) {
  return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

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

export async function PUT(req, { params }) {
  try {
    await connectDB();
    // NEXT.JS 15 FIX: params ko await karna lazmi hai
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const formData = await req.formData();

    // 1. Purana data fetch karein (Existing images check karne ke liye)
    const existingGuide = await Guide.findById(id);
    if (!existingGuide) {
      return NextResponse.json({ success: false, message: "Guide not found" }, { status: 404 });
    }

    // 2. Basic fields extract karein
    const title = formData.get("title");
    const updateData = {
      title,
      slug: generateSlug(title),
      category: formData.get("category"),
      author: formData.get("author") || "Admin",
      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
      summary: formData.get("summary"),
      excerpt: formData.get("excerpt"),
      readTime: Number(formData.get("readTime")) || undefined,
      tags: safeParse(formData.get("tags")),
      keywords: safeParse(formData.get("keywords")),
      faqs: safeParse(formData.get("faqs")),
    };

    // 3. Thumbnail Logic (New vs Existing)
    const thumbnailFile = formData.get("thumbnail");
    if (thumbnailFile && typeof thumbnailFile !== "string" && thumbnailFile.size > 0) {
      // Agar user ne Nayi file upload ki hai
      if (thumbnailFile.size > MAX_FILE_SIZE) throw new Error("Thumbnail size limit exceeded (5MB)");
      updateData.thumbnail = await uploadImage(thumbnailFile, "thumbnails");
    } else {
      // Agar user ne image change nahi ki, to purani hi rehne dein
      updateData.thumbnail = formData.get("existingThumbnail") || existingGuide.thumbnail;
    }

    // 4. Blocks processing (Images in blocks)
    const blocks = safeParse(formData.get("blocks"));


updateData.blocks = await Promise.all(
  blocks.map(async (block, index) => {
    if (block.type === "image") {
      // 1. Check karein ke kya ye block ek placeholder key hai (e.g., "blockImage_0")
      const isPlaceholder = typeof block.file === "string" && block.file.startsWith("blockImage_");

      if (isPlaceholder) {
        // 2. Agar placeholder hai, to formData se asal file nikalien
        const fileObj = formData.get(block.file);

        if (fileObj && typeof fileObj !== "string" && fileObj.size > 0) {
          const newImageUrl = await uploadImage(fileObj, "guide-blocks");
          return { ...block, file: newImageUrl }; // DB mein URL save hoga
        }
      }

      // 3. Agar block.file pehle se ek URL hai (Update ke waqt image change nahi ki)
      // to wo waisa hi save ho jayega.
      return block;
    }

    // Baaki blocks (text, list etc) as it is return honge
    return block;
  })
);

    // 5. Update in MongoDB
    const updatedGuide = await Guide.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, guide: updatedGuide });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Error updating guide",
    }, { status: error.message.includes("limit") ? 400 : 500 });
  }
}

// Helper function: URL se Public ID nikalne ke liye
const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  // Example: https://res.cloudinary.com/demo/image/upload/v1234/folder/image.jpg
  // Isme se "folder/image" nikalna hai
  const parts = url.split('/');
  const fileNameWithExtension = parts.pop(); // image.jpg
  const folder = parts.pop(); // folder
  const publicId = `${folder}/${fileNameWithExtension.split('.')[0]}`;
  // console.log(publicId,"deleted")
  return publicId;
};

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    // Next.js 15 Fix: await params
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // 1. Pehle guide ka data fetch karein taake URLs mil saken
    const guide = await Guide.findById(id);
    if (!guide) {
      return NextResponse.json({ success: false, message: "Guide not found" }, { status: 404 });
    }

    // 2. Thumbnail delete karein Cloudinary se
    if (guide.thumbnail) {
      const thumbId = getPublicIdFromUrl(guide.thumbnail);
      if (thumbId) await cloudinary.uploader.destroy(thumbId);
    }

    // 3. Blocks ki images delete karein
    if (guide.blocks && guide.blocks.length > 0) {
      const imageBlocks = guide.blocks.filter(block => block.type === 'image' && block.file);

      // Saari images ko parallel delete karein
      await Promise.all(
        imageBlocks.map(async (block) => {
          const blockImageId = getPublicIdFromUrl(block.file);
          if (blockImageId) return cloudinary.uploader.destroy(blockImageId);
        })
      );
    }

    // 4. Database se guide delete karein
    await Guide.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Guide and all associated images deleted successfully"
    });

  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
