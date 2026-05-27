import React from 'react'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/10">

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* Top minimal brand */}
        <div className="group flex items-center justify-between p-4 rounded-lg border border-white/10 bg-primary transition-all duration-300 hover:border-primary-hover hover:shadow-[0_0_25px_rgba(244,67,54,0.12)]">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-lg bg-primary-hover flex items-center justify-center text-white font-bold">
              ▶
            </div>

            <div>
              <h2 className="text-white text-sm font-bold leading-tight">
                YouTube Revenue Estimator
              </h2>
              <p className="text-white/60 text-[11px]">
                AI-powered CPM & RPM calculator
              </p>
            </div>

          </div>

          <div className="text-[11px] text-white/50 hidden sm:block">
            2026 Edition
          </div>

        </div>

        {/* Middle compact grid */}
        <div className="grid grid-cols-2 gap-4">

          {/* Links */}
          <div className="p-4 rounded-lg border border-white/10 bg-primary hover:border-primary-hover transition group">

            <h3 className="text-white text-xs font-bold mb-3">
              Links
            </h3>

            <div className="space-y-2 text-xs">

              {[
                { name: "Home", href: "/" },
                { name: "Guide", href: "/guide" },
                { name: "About", href: "/about-us" },
                { name: "Contact", href: "/contact-us" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-white/60 hover:text-primary-hover transition"
                >
                  {item.name}
                </Link>
              ))}

            </div>
          </div>

          {/* Newsletter compact */}
          <div className="p-4 rounded-lg border border-white/10 bg-primary hover:border-primary-hover transition group">

            <h3 className="text-white text-xs font-bold mb-3">
              Updates
            </h3>

            <form className="space-y-2">

              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-lg bg-primary text-white text-xs border border-white/20 outline-none focus:border-primary-hover"
              />

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-primary-hover text-white text-xs font-bold hover:opacity-90 transition"
              >
                Subscribe
              </button>

            </form>

          </div>

        </div>

        {/* Bottom tiny bar */}
        <div className="text-center py-3 border border-white/10 rounded-lg bg-primary hover:border-primary-hover transition">

          <p className="text-[11px] text-white/50">
            © 2026 YouTube Revenue Estimator · All rights reserved
          </p>

          <div className="flex justify-center gap-4 mt-2 text-[11px]">

            <Link href="/privacy-policy" className="text-white/50 hover:text-white">
              Privacy
            </Link>

            <Link href="/terms-of-service" className="text-white/50 hover:text-white">
              Terms
            </Link>

            <Link href="/disclaimer" className="text-white/50 hover:text-white">
              Disclaimer
            </Link>

          </div>

        </div>

      </div>
    </footer>
  )
}