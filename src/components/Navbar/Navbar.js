"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Guide", href: "/guide" },
    {
      name: "Calculator",
      href: "/tool/youtube-revenue-calculator",
    },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="border-b border-white dark:border-primary bg-white dark:bg-primary shadow-sm">
        <div className="max-w-6xl mx-auto px-4">

          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <Image
                src="/icon.png"
                alt="YouTube Revenue Estimator Logo"
                width={42}
                height={42}
                className="rounded-lg"
              />


            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-primary dark:text-white rounded-lg hover:bg-white/30 dark:hover:bg-primary transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white dark:hover:bg-primary transition-all"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[4px]">
                <span
                  className={`w-5 h-0.5 bg-primary dark:bg-white rounded-lg transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-primary dark:bg-seconary rounded-lg transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-primary dark:bg-white rounded-lg transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen
                ? "max-h-96 opacity-100 pb-4"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-1 pt-2 border-t border-white dark:border-primary">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-white dark:text-white rounded-lg hover:bg-white/10 dark:hover:bg-primary transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}