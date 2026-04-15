"use client";
import GuideForm from "../../components/AdminUseOnly/GuideForm/page";
import { useState, useEffect } from "react";
import ListingGuide from "../../components/AdminUseOnly/ListingGuide/page"
// import { getGuides } from "../hooks/getGuides";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [editData,setEditData] = useState()
  const [guides, setGuides] = useState([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/guide?page=${page}&limit=6`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        console.error("❌ API Error:", res.status, res.statusText);
        return;
      }

      const data = await res.json();
      setGuides(data.guides);
      setTotalPages(data.pagination.totalPages); // ✅ ADD

    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  fetchData();
}, [page]); // ✅ ADD

// console.log(editData,"edit")
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          🧠 Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("guides")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === "guides"
                ? "bg-blue-600"
                : "hover:bg-gray-800 transition"
              }`}
          >
            📘 Create Guide
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${activeTab === "analytics"
                ? "bg-blue-600"
                : "hover:bg-gray-800 transition"
              }`}
          >
            📊Guide Section
          </button>


        </nav>

        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          © {new Date().getFullYear()} ChannelIncome
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab === "guides"
              ? "Create New Guide"
              : activeTab === "analytics"
                ? "Analytics Dashboard"
                : "Settings"}
          </h1>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
            Logout
          </button>
        </header>

        {/* Page Content */}
        <section className="p-6 flex-1 overflow-y-auto">
          {activeTab === "guides" && <GuideForm editData={editData}/>}
          {activeTab === "analytics" && (
            <div className="text-gray-600 text-lg"><ListingGuide data={guides} role={true} setEditData={setEditData} setActiveTab={setActiveTab}/></div>
          )}

      <div className="flex items-center gap-6 mt-12 bg-gray-50 px-6 py-3 rounded-2xl shadow-sm">
  <button
    onClick={() => setPage((p) => Math.max(1, p - 1))}
    disabled={page === 1}
    className={`px-5 py-2 rounded-xl font-bold transition-all shadow-sm ${
      page === 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-white text-red-600 border border-red-100 hover:bg-red-600 hover:text-white"
    }`}
  >
    ← Previous
  </button>

  <span className="font-bold text-gray-700">
    Page <span className="text-red-600">{page}</span> of {totalPages}
  </span>

  <button
    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
    disabled={page === totalPages}
    className={`px-5 py-2 rounded-xl font-bold transition-all shadow-md ${
      page === totalPages
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-red-600 text-white hover:bg-red-700"
    }`}
  >
    Next →
  </button>
</div>



        </section>
      </main>
    </div>
  );
}
