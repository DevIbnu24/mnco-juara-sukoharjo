import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

// Memastikan Next.js selalu menarik data terbaru dari database
export const dynamic = "force-dynamic";

export default async function LayananPublicPage() {
  // 1. Tarik data layanan dari database
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Tarik data pengaturan web (Khusus Nomor Konsultan)
  const setting = await prisma.webSetting.findFirst();
  const waNumber =
    setting?.waConsultant || setting?.waNumber || "6281229894433";

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800">
      {/* ========================================= */}
      {/* 1. HERO SECTION - Dark & Premium Style    */}
      {/* ========================================= */}
      <section className="bg-slate-900 text-white pt-20 md:pt-28 pb-36 md:pb-48 px-5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 w-full max-w-3xl h-full bg-blue-600/10 blur-[100px] transform -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-5">
            Layanan Korporat MNCo Juara
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight leading-tight">
            Solusi Perpajakan <br className="hidden sm:block" /> & Pendampingan
            Hukum.
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-[13px] md:text-[15px] leading-relaxed">
            Pendekatan strategis, rahasia, dan terukur. Kami hadir untuk
            memastikan kepatuhan pajak perusahaan Anda sekaligus meminimalkan
            risiko hukum di masa depan.
          </p>
        </div>
      </section>

      {/* ========================================= */}
      {/* 2. SERVICES GRID - Overlapping Effect     */}
      {/* ========================================= */}
      <section className="px-5 max-w-6xl mx-auto -mt-20 md:-mt-28 relative z-20 pb-20 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.length === 0 ? (
            <div className="col-span-full bg-white p-10 md:p-14 rounded-3xl text-center shadow-lg border border-slate-100">
              <svg
                className="w-12 h-12 text-slate-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Belum Ada Layanan
              </h3>
              <p className="text-slate-500 text-[13px]">
                Daftar layanan sedang diperbarui. Silakan kelola melalui panel
                Admin.
              </p>
            </div>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="group bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
              >
                {/* Ikon Mewah */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 transition-colors duration-500 shadow-sm">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <h3 className="text-[16px] md:text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-[13px] md:text-[14px] leading-relaxed flex-1 mb-6">
                  {service.description}
                </p>

                {/* Link WA Dinamis per Layanan */}
                <div className="mt-auto pt-5 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Halo Tim MNCo Juara, saya mengunjungi website Anda dan tertarik berdiskusi lebih lanjut mengenai layanan *${service.title}*. Apakah ada konsultan yang tersedia untuk mengatur jadwal pertemuan?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[12px] md:text-[13px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors"
                  >
                    Konsultasikan via WhatsApp
                    <svg
                      className="w-4 h-4 transform transition-transform group-hover:translate-x-1.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ========================================= */}
      {/* 3. CTA (Call To Action) SECTION           */}
      {/* ========================================= */}
      {services.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 pb-20 md:pb-28">
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="text-xl md:text-2xl font-extrabold mb-3 relative z-10">
              Butuh Solusi Spesifik untuk Bisnis Anda?
            </h3>
            <p className="text-blue-100 text-[13px] md:text-sm mb-8 max-w-xl mx-auto relative z-10">
              Tim konsultan bersertifikat Brevet C kami siap menganalisis dan
              memberikan skema perpajakan paling efisien untuk Anda.
            </p>

            {/* Tombol WA Dinamis General */}
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent("Halo Tim MNCo Juara, saya mengunjungi website Anda dan ingin menjadwalkan konsultasi gratis untuk bisnis saya. Apakah ada konsultan yang tersedia?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-700 font-bold text-[13px] md:text-sm px-8 py-3.5 rounded-full hover:bg-slate-50 hover:shadow-lg transition-all transform hover:-translate-y-0.5 relative z-10"
            >
              Jadwalkan Konsultasi Gratis
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
