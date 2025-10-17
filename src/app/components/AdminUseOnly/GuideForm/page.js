"use client";
import { useState } from "react";

export default function GuideForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    category: "",
    summary: "",
    readTime: "",
    author: "",
  });

  const [tags, setTags] = useState([""]);
  const [keywords, setKeywords] = useState([""]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Input handlers
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleArrayChange = (index, value, type) => {
    const arr = type === "tags" ? [...tags] : [...keywords];
    arr[index] = value;
    type === "tags" ? setTags(arr) : setKeywords(arr);
  };

  const addArrayField = (type) => {
    type === "tags"
      ? setTags([...tags, ""])
      : setKeywords([...keywords, ""]);
  };

  const removeArrayField = (index, type) => {
    type === "tags"
      ? setTags(tags.filter((_, i) => i !== index))
      : setKeywords(keywords.filter((_, i) => i !== index));
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("tags", JSON.stringify(tags.filter((t) => t.trim() !== "")));
      formData.append("keywords", JSON.stringify(keywords.filter((k) => k.trim() !== "")));

      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("/api/guide", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Guide added successfully!");
        setForm({
          title: "",
          content: "",
          metaTitle: "",
          metaDescription: "",
          category: "",
          summary: "",
          readTime: "",
          author: "",
        });
        setTags([""]);
        setKeywords([""]);
        setPreview(null);
      } else {
        setMessage("❌ " + (data.error || data.message));
      }
    } catch (err) {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 Add New Guide</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md"
        />

        <textarea
          name="content"
          placeholder="Full Content"
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-md"
        ></textarea>

        {/* SEO */}
        <input
          type="text"
          name="metaTitle"
          placeholder="Meta Title"
          value={form.metaTitle}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <input
          type="text"
          name="metaDescription"
          placeholder="Meta Description"
          value={form.metaDescription}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <textarea
          name="summary"
          placeholder="Short Summary"
          rows="3"
          value={form.summary}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        ></textarea>

        <input
          type="number"
          name="readTime"
          placeholder="Read Time (minutes)"
          value={form.readTime}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Tags */}
        <div>
          <label className="font-semibold">Tags</label>
          {tags.map((tag, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input
                value={tag}
                onChange={(e) => handleArrayChange(i, e.target.value, "tags")}
                className="w-full border p-2 rounded-md"
                placeholder="Enter tag"
              />
              {tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(i, "tags")}
                  className="px-3 bg-red-500 text-white rounded-md"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("tags")}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md"
          >
            ➕ Add Tag
          </button>
        </div>

        {/* Keywords */}
        <div>
          <label className="font-semibold">Keywords</label>
          {keywords.map((kw, i) => (
            <div key={i} className="flex gap-2 mt-1">
              <input
                value={kw}
                onChange={(e) => handleArrayChange(i, e.target.value, "keywords")}
                className="w-full border p-2 rounded-md"
                placeholder="Enter keyword"
              />
              {keywords.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField(i, "keywords")}
                  className="px-3 bg-red-500 text-white rounded-md"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("keywords")}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-md"
          >
            ➕ Add Keyword
          </button>
        </div>

        {/* Image */}
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded-md border"
            />
          )}
        </div>

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          {loading ? "Submitting..." : "Add Guide"}
        </button>

        {message && (
          <p className="text-center text-gray-700 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
