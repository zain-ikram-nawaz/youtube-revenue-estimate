import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    // 🔹 Basic Info
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    content: { type: String, required: true },
    image: { type: String },

    // 🔹 SEO Fields
    metaTitle: { type: String },
    metaDescription: { type: String },
    tags: [{ type: String, index: true }],
    category: { type: String, index: true },
    summary: { type: String },
    keywords: [String],

    // 🔹 Author & Publish Info
    author: { type: String, default: "Admin" },
    publishedAt: { type: Date, default: Date.now },
    readTime: { type: Number },
  },
  { timestamps: true }
);

// ✅ Auto-update updatedAt
guideSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// ✅ Simple JS slug generator (no packages)
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // spaces → dashes
    .replace(/-+/g, "-");         // multiple dashes → single
}

// ✅ Auto-generate slug & handle duplicates (adds -1, -2, etc.)
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
