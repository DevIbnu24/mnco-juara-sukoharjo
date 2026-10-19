"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Tutup menu otomatis saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-[60] font-sans">
      <div className="max-w-6xl mx-auto px-5 h-[70px] md:h-[76px] flex justify-between items-center bg-white relative z-[70]">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/logo-mnco.png"
            alt="Logo MNCo Juara"
            className="h-8 md:h-9 w-auto object-contain"
          />
          <span className="font-extrabold text-xl md:text-2xl text-blue-900 tracking-tight">
            MNCo Juara
          </span>
        </Link>

        {/* MENU DESKTOP (PC) */}
        <div className="hidden lg:flex items-center gap-8 font-semibold text-[13px] text-slate-700">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <Link
            href="/tentang"
            className="hover:text-blue-600 transition-colors"
          >
            Tentang Kami
          </Link>
          <Link
            href="/layanan"
            className="hover:text-blue-600 transition-colors"
          >
            Layanan
          </Link>
          <Link
            href="/insight"
            className="hover:text-blue-600 transition-colors"
          >
            Insight
          </Link>
          <Link
            href="/kontak"
            className="text-[13px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* TOMBOL HAMBURGER MOBILE */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 -mr-2 text-slate-700 focus:outline-none cursor-pointer"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* MENU MOBILE - Ramping & Akurat */}
      {isOpen && (
        <div className="lg:hidden absolute top-[70px] left-0 w-full bg-white shadow-[0_10px_20px_rgb(0,0,0,0.05)] border-t border-slate-100 z-[50]">
          <div className="flex flex-col px-5 py-3 bg-white">
            <Link
              href="/"
              className="text-[14px] font-bold text-slate-700 py-3 border-b border-slate-100 hover:text-blue-600 transition-colors"
            >
              Beranda
            </Link>

            <Link
              href="/tentang"
              className="text-[14px] font-bold text-slate-700 py-3 border-b border-slate-100 hover:text-blue-600 transition-colors"
            >
              Tentang Kami
            </Link>

            <Link
              href="/layanan"
              className="text-[14px] font-bold text-slate-700 py-3 border-b border-slate-100 hover:text-blue-600 transition-colors"
            >
              Layanan
            </Link>

            <Link
              href="/insight"
              className="text-[14px] font-bold text-slate-700 py-3 border-b border-slate-100 hover:text-blue-600 transition-colors"
            >
              Insight
            </Link>

            <div className="pt-5 pb-3">
              <Link
                href="/kontak"
                className="block text-center bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[13px] py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-colors w-full shadow-sm"
              >
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
