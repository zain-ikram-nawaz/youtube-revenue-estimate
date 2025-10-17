"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddGuide() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    tags: "",
    author: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("✅ Guide added successfully!");
        setForm({
          title: "",
          content: "",
          metaTitle: "",
          metaDescription: "",
          tags: "",
          author: "",
          image: "",
        });
        // router.push("/admin/guides");
      } else {
        setMessage("❌ Failed: " + data.message || data.error);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-xl rounded-2xl p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📝 Add New Guide</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring focus:ring-blue-200"
            placeholder="Enter guide title"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring focus:ring-blue-200"
            placeholder="Write full content here..."
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Meta Description</label>
            <input
              type="text"
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1"
            placeholder="e.g. YouTube, Monetization, SEO"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {message && <p className="text-sm text-center text-gray-700">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          {loading ? "Submitting..." : "Add Guide"}
        </button>
      </form>
    </div>
  );
}
