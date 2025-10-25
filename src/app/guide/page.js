import React from "react";
import HomeListing from "../components/HomeListing/page";
import { getGuides } from "../hooks/getGuides";
import Link from "next/link";

export default async function Page({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const limit = 6;

  const { guides, pagination: { totalPages } } = await getGuides(page, limit);

  return (
    <div className="flex flex-col items-center">
      <HomeListing data={guides} />

      <div className="flex gap-4 mt-6">
        {page > 1 ? (
          <Link
            href={`guide/?page=${page - 1}`}
            className="px-4 py-2 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700"
          >
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded-xl font-semibold bg-gray-300 cursor-not-allowed"
          >
            Previous
          </button>
        )}

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Link
            href={`guide/?page=${page + 1}`}
            className="px-4 py-2 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded-xl font-semibold bg-gray-300 cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
