import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page({ data }) {
  const safeData = useMemo(() => {
    if (!data) return [];
    const parsed = JSON.parse(JSON.stringify(data));
    return [...parsed].reverse().slice(0, 12);
  }, [data]);

  if (!data || data?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No guides found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">YouTube Guides</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeData.map((guide) => (
            <div key={guide._id} className="bg-white border rounded-lg overflow-hidden">
              <div className="relative h-40 w-full bg-gray-100">
                <Image
                  src={guide?.coverImage || guide?.thumbnail || "/icon.png"}
                  alt={guide?.coverImageAlt || guide?.title || "Guide"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <Link href={`/guide/${guide.slug}`}>
                  <h3 className="text-sm font-bold mb-2">
                    {guide?.title}
                  </h3>
                </Link>

                <p className="text-xs text-gray-500 mb-4">
                  {guide?.metaDescription}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {new Date(guide?.createdAt).toLocaleDateString("en-GB")}
                  </span>
                  <Link href={`/guide/${guide.slug}`} className="text-xs text-blue-500">
                    View Guide →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}