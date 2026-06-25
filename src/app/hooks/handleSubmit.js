import axios from "axios";
import { calculateReadTime } from "./readTime";

export const handleSubmitGuide = async ({
  e,
  formData,
  setFormData,
  setMessage,
  setIsSubmitting,
  editId = null,
}) => {
  e.preventDefault();
  setIsSubmitting(true);
  setMessage({ text: "", type: "" });

  try {
    const readTime = calculateReadTime(formData.content || "");
    const data = new FormData();

    // Append cover image file only if new file selected
    if (formData.coverImage instanceof File) {
      data.append("coverImage", formData.coverImage, formData.coverImage.name);
    } else if (typeof formData.coverImage === "string") {
      data.append("existingCoverImage", formData.coverImage);
    }

    // All other text fields
    const skip = ["coverImage", "tags", "keywords", "faqs"];
    Object.keys(formData).forEach((key) => {
      if (skip.includes(key)) return;
      data.append(key, formData[key] ?? "");
    });

    data.append("tags", JSON.stringify(formData.tags || []));
    data.append("keywords", JSON.stringify(formData.keywords || []));
    data.append("faqs", JSON.stringify(formData.faqs || []));
    data.append("readTime", readTime);

    const url = editId ? `/api/guide/${editId}` : "/api/guide";
    const method = editId ? "put" : "post";

    await axios[method](url, data, { headers: { "Content-Type": "multipart/form-data" } });

    setMessage({
      text: editId ? "Guide updated successfully!" : "Guide published successfully!",
      type: "success",
    });

    if (!editId) {
      setFormData({
        title: "", category: "", author: "ChannelIncome Team", status: "published",
        coverImage: null, coverImageAlt: "", content: "",
        metaTitle: "", metaDescription: "", excerpt: "",
        tags: [], keywords: [], faqs: [],
      });
    }
  } catch (err) {
    console.error("Submit error:", err);
    setMessage({ text: err.response?.data?.message || "Error saving guide.", type: "error" });
  } finally {
    setIsSubmitting(false);
  }
};
