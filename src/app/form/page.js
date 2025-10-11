"use client";

import { useState } from "react";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        metaTitle,
        metaDescription,
        tags: tags.split(",").map((t) => t.trim()),
        author,
        image,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("Blog submitted successfully 🚀");
      setTitle(""); setContent(""); setMetaTitle(""); setMetaDescription(""); setTags(""); setImage("");
    } else {
      setMessage("Error: " + data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-4 border rounded shadow">
      {message && <p className="text-green-500">{message}</p>}

      <div>
        <label className="block font-bold mb-1">Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block font-bold mb-1">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={6} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block font-bold mb-1">Meta Title (SEO)</label>
        <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} required className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block font-bold mb-1">Meta Description (SEO)</label>
        <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} required rows={3} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block font-bold mb-1">Tags (comma separated)</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block font-bold mb-1">Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block font-bold mb-1">Featured Image URL</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border p-2 rounded" />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Blog
      </button>
    </form>
  );
}
