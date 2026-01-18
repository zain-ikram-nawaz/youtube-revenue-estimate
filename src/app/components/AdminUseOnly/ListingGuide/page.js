"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Page({ data, setEditData, setActiveTab, setGuides }) {
  const [deletingId, setDeletingId] = useState(null);

  const SaveEditData = (item) => {
    setEditData(item);
    setActiveTab("guides");
  };

  // ✅ Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;

    setDeletingId(id);
    try {
      const response = await axios.delete(`/api/guide/${id}`);
      if (response.data.success) {
        alert("Guide deleted successfully!");
        // UI se guide hatane ke liye state update karein
        // Note: setGuides function aapke parent component se aana chahiye
        if (setGuides) {
          setGuides((prev) => prev.filter((g) => g._id !== id));
        } else {
          // Agar setGuides nahi hai to page reload kar sakte hain
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting guide");
    } finally {
      setDeletingId(null);
    }
  };

  if (!data || data?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-gray-600 text-lg font-medium">No guides found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {data?.slice(0, 8).toReversed()?.map((guide) => (
        <div key={guide._id} className="relative group/container">

          {/* CARD (Navigation) */}
          <Link href={`/guide/${guide.slug}`}>
            <div className="group cursor-pointer relative bg-white/70 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-white/90 hover:shadow-2xl hover:shadow-blue-100/50 rounded-3xl overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={guide?.thumbnail || "/icon.png"}
                  alt={guide?.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {guide?.title}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {guide?.metaDescription}
                </p>
                <div className="mt-3 text-gray-400 text-xs">
                  {new Date(guide?.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>
              </div>
            </div>
          </Link>

          {/* ACTION BUTTONS (Floating) */}
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            {/* Edit Button */}
            {/* <button
              onClick={() => SaveEditData(guide)}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Edit
            </button> */}

            {/* Delete Button */}
            {/* <button
              onClick={() => handleDelete(guide._id)}
              disabled={deletingId === guide._id}
              className={`px-3 py-1 text-xs text-white rounded-lg transition-colors shadow-lg ${
                deletingId === guide._id ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {deletingId === guide._id ? "..." : "Delete"}
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
}