import Navbar from "./Navbar";
import Link from "next/link";

// =========================================================================
// PENGATURAN SEO & LINK PREVIEW (Whatsapp, Google, Sosmed)
// =========================================================================
export const metadata = {
  title: "MNCo Juara | Konsultan Pajak & Kuasa Hukum",
  description:
    "MNCo Juara adalah firma profesional bersertifikat Brevet C dan Kuasa Hukum terdaftar. Kami memberikan solusi konsultasi, sengketa, dan perencanaan pajak untuk amankan bisnis Anda.",
  icons: {
    icon: "/logo-mnco.png", // Menampilkan logo kecil di Tab Browser bagian atas
  },
  openGraph: {
    title: "MNCo Juara | Konsultan Pajak & Kuasa Hukum",
    description:
      "Mitra strategis finansial Anda. Layanan konsultasi pajak korporat, sengketa pajak, dan pendampingan hukum wilayah Sukoharjo, Semarang & sekitarnya.",
    siteName: "MNCo Juara",
    images: [
      {
        url: "/logo-mnco.png", // Logo yang akan muncul besar saat link disebar di WhatsApp
        width: 800,
        height: 600,
        alt: "Logo MNCo Juara",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-blue-200">
      <Navbar />

      <main className="flex-grow">{children}</main>

      {/* FOOTER - Ramping, Grid 2 Kolom di HP, dengan Ikon SVG Profesional */}
      <footer className="bg-slate-900 text-slate-300 pt-8 md:pt-12 pb-5 border-t border-slate-800 font-sans">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mb-8">
            {/* 1. Info Perusahaan */}
            <div className="col-span-2 lg:col-span-1 pr-4">
              <h3 className="text-lg font-extrabold text-white mb-2 tracking-tight">
                MNCo Juara
              </h3>
              <p className="text-[11px] md:text-xs leading-relaxed text-slate-400">
                Mitra strategis finansial. Konsultan Pajak & Kuasa Hukum
                terpercaya bersertifikasi Brevet C untuk mengamankan bisnis
                Anda.
              </p>
            </div>

            {/* 2. Link Layanan */}
            <div>
              <h4 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest text-slate-300">
                Layanan
              </h4>
              <ul className="space-y-2 text-[11px] md:text-xs text-slate-400">
                <li>
                  <Link
                    href="/layanan/konsultasi"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Konsultasi & Kepatuhan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/layanan/sengketa"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Sengketa & Kuasa Hukum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/layanan/perencanaan"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Perencanaan Pajak
                  </Link>
                </li>
                <li>
                  <Link
                    href="/layanan/training"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Corporate Training
                  </Link>
                </li>
              </ul>
            </div>

            {/* 3. Kantor Pusat */}
            <div>
              <h4 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest text-slate-300">
                Pusat (Sukoharjo)
              </h4>
              <div className="text-[11px] md:text-xs text-slate-400 space-y-2">
                <p className="font-bold text-slate-200">MNCo Juara</p>
                <p className="leading-relaxed flex items-start gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Gawanan, Sukoharjo, Jawa Tengah 57512
                </p>
                <p className="text-blue-400 font-medium flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  0812-2989-4433
                </p>
              </div>
            </div>

            {/* 4. Kantor Cabang */}
            <div>
              <h4 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest text-slate-300">
                Cabang (Semarang)
              </h4>
              <div className="text-[11px] md:text-xs text-slate-400 space-y-2">
                <p className="font-bold text-slate-200">MNCo Semarang</p>
                <p className="leading-relaxed flex items-start gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Jl. Pleburan VI No.18A, Kota Semarang 50241
                </p>
                <p className="text-blue-400 font-medium flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  0812-2989-4433
                </p>
              </div>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="pt-5 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] md:text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} MNCo Juara. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
