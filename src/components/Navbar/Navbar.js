"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { getAllLiveTools } from "../../app/lib/tools";

const TOOLS = getAllLiveTools();

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const toolsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 8);

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
    { name: "Guides", href: "/guide" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ];


  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`bg-background/95 backdrop-blur border-b transition-shadow duration-300 ${
          scrolled ? "border-border shadow-sm" : "border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Image
                src="/icon.png"
                alt="ChannelIncome Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-display font-extrabold text-foreground text-[17px] tracking-tight leading-none">
                Channel<span className="text-primary">Income</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-semibold text-foreground/80 rounded-full hover:bg-secondary hover:text-foreground transition-all duration-200"
              >
                Home
              </Link>

              {/* Tools dropdown */}
              <div className="relative" ref={toolsRef}>
                <button
                  onClick={() => setToolsOpen((v) => !v)}
                  className="px-4 py-2 text-sm font-semibold text-foreground/80 rounded-full hover:bg-secondary hover:text-foreground transition-all duration-200 flex items-center gap-1"
                  aria-expanded={toolsOpen}
                >
                  Tools
                  <svg className={`w-3 h-3 transition-transform ${toolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {toolsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border rounded-2xl shadow-lg p-2 z-50">
                    {TOOLS.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors"
                      >
                        <span className="text-lg shrink-0">{tool.icon}</span>
                        <span>
                          <span className="block text-sm font-bold text-foreground">{tool.shortName}</span>
                          <span className="block text-xs text-muted leading-snug">{tool.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-semibold text-foreground/80 rounded-full hover:bg-secondary hover:text-foreground transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/tool/youtube-revenue-calculator"
                className="ml-2 px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-full shadow-sm active:scale-95 transition-all duration-200"
              >
                Calculator
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary transition-all"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-1 pt-2 border-t border-border">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-sm font-semibold text-foreground rounded-xl hover:bg-secondary transition-all duration-200"
              >
                Home
              </Link>

              <button
                onClick={() => setMobileToolsOpen((v) => !v)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground rounded-xl hover:bg-secondary transition-all duration-200"
                aria-expanded={mobileToolsOpen}
              >
                Tools
                <svg className={`w-3 h-3 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileToolsOpen && (
                <div className="ml-2 flex flex-col gap-1 border-l border-border pl-3">
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      onClick={() => { setIsMenuOpen(false); setMobileToolsOpen(false); }}
                      className="px-3 py-2 text-sm text-foreground/80 rounded-lg hover:bg-secondary transition-all duration-200"
                    >
                      {tool.icon} {tool.shortName}
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-foreground rounded-xl hover:bg-secondary transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/tool/youtube-revenue-calculator"
                onClick={() => setIsMenuOpen(false)}
                className="mt-1 px-4 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl text-center shadow-sm transition-all duration-200"
              >
                Open Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
