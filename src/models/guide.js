import mongoose from "mongoose";

// 🔹 Block Schema (Flexible dynamic content)
const contentBlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "heading",
        "subheading",
        "paragraph",
        "list",
        "table",
        "image",
        "video",
        "faq",
        "link",
      ],
    },

    // Common fields for different types
    text: { type: String }, // for heading, subheading, paragraph, link text
    items: [String], // for lists
    rows: [[String]], // for tables

    // Images (stored in backend file system, compressed before save)
    file: { type: String }, // image file path
    caption: { type: String },

    // Video (link only)
    url: { type: String }, // video or link URL

    // FAQ block
    question: { type: String },
    answer: { type: String },
  },
  { _id: false }
);

// 🔹 FAQ Schema (standalone FAQs section)
const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

// 🔹 Main Guide Schema
const guideSchema = new mongoose.Schema(
  {
    // 🏷️ Basic Info
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    category: { type: String, index: true },
    author: { type: String, default: "Admin" },

    // 🖼️ Thumbnail (compressed before save)
    thumbnail: { type: String }, // ✅ added field for post preview image

    // 📦 Content Blocks (dynamic)
    blocks: [contentBlockSchema],

    // 📚 SEO & AEO Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    summary: { type: String },
    excerpt: { type: String },
    tags: [{ type: String, index: true }],
    keywords: [String],
    readTime: { type: Number },

    // ❓ FAQs (separate section)
    faqs: [faqSchema],

    // 🕒 Publish Info
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// ✅ Auto-update `updatedAt`
guideSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// ✅ Simple JS slug generator (no external package)
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → dashes
    .replace(/-+/g, "-"); // multiple dashes → single
}

// ✅ Auto-generate unique slug (with -1, -2 if duplicate)
guideSchema.pre("validate", async function (next) {
  if (!this.slug && this.title) {
    let baseSlug = generateSlug(this.title);
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check existing slugs in DB
    while (await mongoose.models.Guide.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }
  next();
});

export default mongoose.models.Guide || mongoose.model("Guide", guideSchema);
