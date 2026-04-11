"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full bg-background shadow-sm z-50 border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="overflow-hidden">
              <Image
                src="/icon.png"
                alt="YouTube Revenue Estimator Logo"
                width={60}
                height={60}
                className="object-cover"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-1 font-medium">
            <Link
              href="/"
              className="text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 text-sm"
            >
              Home
            </Link>
            <Link
              href="/guide"
              className="text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 text-sm"
            >
              Guide
            </Link>
            <Link
              href="/tool/youtube-revenue-calculator"
              className="text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 text-sm"
            >
              Tool
            </Link>
            <Link
              href="/about-us"
              className="text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 text-sm"
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 text-sm"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-3 space-y-1 border-t border-border mt-3">
            <Link
              href="/"
              className="block text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/guide"
              className="block text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Guide
            </Link>
            <Link
              href="/tool/youtube-revenue-calculator"
              className="block text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Tool
            </Link>
            <Link
              href="/about-us"
              className="block text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact-us"
              className="block text-foreground hover:text-primary hover:bg-accent px-3 py-2 rounded-md transition-all duration-200 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}