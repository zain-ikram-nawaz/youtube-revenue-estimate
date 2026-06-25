import mongoose from "mongoose";

function generateSlug(text) {
  return text.toString().toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function calcReadTime(content = "") {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const faqSchema = new mongoose.Schema(
  { question: { type: String, required: true }, answer: { type: String, required: true } },
  { _id: false }
);

const guideSchema = new mongoose.Schema(
  {
    title:          { type: String, required: true },
    slug:           { type: String, unique: true, index: true },
    author:         { type: String, default: "ChannelIncome Team" },
    category:       { type: String, index: true },
    status:         { type: String, enum: ["draft", "published"], default: "published" },
    coverImage:     { type: String },
    coverImageAlt:  { type: String },
    content:        { type: String, default: "" },   // Markdown
    metaTitle:      { type: String },
    metaDescription:{ type: String },
    excerpt:        { type: String },
    tags:           [{ type: String, index: true }],
    keywords:       [String],
    readTime:       { type: Number },
    faqs:           [faqSchema],
    publishedAt:    { type: Date, default: Date.now },
  },
  { timestamps: true }
);

guideSchema.pre("validate", async function (next) {
  if (!this.slug && this.title) {
    let base = generateSlug(this.title), slug = base, i = 1;
    while (await mongoose.models.Guide?.findOne({ slug })) slug = `${base}-${i++}`;
    this.slug = slug;
  }
  if (this.content !== undefined) this.readTime = calcReadTime(this.content);
  next();
});

export default mongoose.models.Guide || mongoose.model("Guide", guideSchema);
