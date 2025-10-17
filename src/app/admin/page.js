"use client";
import GuideForm from "../components/AdminUseOnly/GuideForm/page";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("guides");

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
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "guides"
                ? "bg-blue-600"
                : "hover:bg-gray-800 transition"
            }`}
          >
            📘 Create Guide
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "analytics"
                ? "bg-blue-600"
                : "hover:bg-gray-800 transition"
            }`}
          >
            📊 Analytics
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`block w-full text-left px-4 py-2 rounded-lg ${
              activeTab === "settings"
                ? "bg-blue-600"
                : "hover:bg-gray-800 transition"
            }`}
          >
            ⚙️ Settings
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
          {activeTab === "guides" && <GuideForm />}
          {activeTab === "analytics" && (
            <div className="text-gray-600 text-lg">📊 Analytics Coming Soon...</div>
          )}
          {activeTab === "settings" && (
            <div className="text-gray-600 text-lg">⚙️ Settings Page Coming Soon...</div>
          )}
        </section>
      </main>
    </div>
  );
}
