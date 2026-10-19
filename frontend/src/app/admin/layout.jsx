import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="p-6 border-b border-slate-800/80">
          <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            Admin
          </span>
          <p className="text-slate-400 text-xs mt-2 font-medium tracking-wide">
            MNCo Juara Sukoharjo
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors text-sm font-semibold text-slate-300"
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            Dashboard
          </Link>

          <div className="pt-6 pb-2">
            <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Kelola Konten
            </p>
          </div>

          <Link
            href="/admin/layanan"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors text-sm font-semibold text-slate-300"
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Layanan Kami
          </Link>
          <Link
            href="/admin/portofolio"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors text-sm font-semibold text-slate-300"
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Portofolio
          </Link>
          <Link
            href="/admin/insight"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors text-sm font-semibold text-slate-300"
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              ></path>
            </svg>
            Insight / Artikel
          </Link>
        </nav>

        <div className="pt-6 pb-2 border-t border-slate-800/80 mt-4">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Sistem
          </p>
        </div>

        <Link
          href="/admin/pengaturan"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors text-sm font-semibold text-slate-300"
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          Pengaturan Web
        </Link>

        <Link
          href="/admin/insight"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors text-sm font-semibold text-slate-300"
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            ></path>
          </svg>
          Insight / Artikel
        </Link>

        <Link
          href="/admin/tim"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-blue-400 transition-colors text-sm font-semibold text-slate-300"
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          Kelola Tim
        </Link>

        <div className="p-5 border-t border-slate-800/80">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white py-3 rounded-xl transition-all duration-300 text-sm font-bold shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            Lihat Web Publik
          </Link>
        </div>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        {/* Header Atas Admin */}
        <header className="bg-white shadow-[0_1px_2px_rgb(0,0,0,0.03)] border-b border-slate-100 px-8 py-4 flex justify-between items-center z-10 h-[76px]">
          <h2 className="text-[15px] font-extrabold text-slate-800 uppercase tracking-wider">
            Manajemen Konten
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[13px] font-bold text-slate-700 leading-tight">
                Super Admin
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                admin@mncojuara.com
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 text-blue-600 border border-blue-200 rounded-full flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer">
              AD
            </div>
          </div>
        </header>

        {/* Isi Halaman Admin */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}
