"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full bg-white shadow-lg z-50 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-red-800">MyWebsite</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8 font-medium">
            <Link
              href="/"
              className="text-red-900 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
              <Link
              href="/guide"
              className="text-red-900 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Guide
            </Link>
            {/* <Link
              href="/blog"
              className="text-red-900 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Blog
            </Link> */}
            <Link
              href="/about-us"
              className="text-red-900 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              About Us
            </Link>
            <Link
              href="/contact-us"
              className="text-red-900 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/tool"
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
            >
              Tool
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-red-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-red-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-red-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-3 border-t border-red-100 mt-3">
            <Link
              href="/"
              className="block text-red-900 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="block text-red-900 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block text-red-900 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block text-red-900 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="/tool"
              className="block bg-red-600 text-white hover:bg-red-700 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-center shadow-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Tool
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}