import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. Tarik Data Beranda dari Database Admin
  const setting = await prisma.webSetting.findFirst();

  const heroTitle =
    setting?.heroTitle || "Amankan Bisnis Anda Bersama Ahlinya.";
  const heroSubtitle =
    setting?.heroSubtitle ||
    "Solusi perpajakan terintegrasi, akurat, dan rahasia untuk Wajib Pajak Pribadi dan Badan Usaha di Sukoharjo, Semarang, & Sekitarnya.";
  const waConsultant =
    setting?.waConsultant || setting?.waNumber || "6281229894433";

  // Data Statis Fitur & Galeri
  const features = [
    {
      id: 1,
      title: "Integritas & Kerahasiaan",
      desc: "Menjamin kerahasiaan seluruh data finansial Anda dengan kode etik profesional yang ketat dan tersertifikasi.",
    },
    {
      id: 2,
      title: "Akurasi Regulasi",
      desc: "Selalu up-to-date dengan pembaruan peraturan perpajakan terbaru di Indonesia untuk menghindari sanksi administratif.",
    },
    {
      id: 3,
      title: "Perlindungan Hukum",
      desc: "Otoritas penuh untuk bertindak secara sah mewakili dan membela hak Anda di hadapan Direktorat Jenderal Pajak.",
    },
  ];

  const gallery = [
    {
      id: 0,
      src: "/foto-depan.jpg",
      title: "MNCo Juara Sukoharjo",
      label: "Kantor Pusat",
    },
    {
      id: 1,
      src: "/foto-meeting.jpg",
      title: "Private Meeting Room",
      label: "Fasilitas",
    },
    {
      id: 2,
      src: "/foto-kerja.jpg",
      title: "Ruang Operasional Tim",
      label: "Fasilitas",
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden font-sans text-slate-800">
      {/* CSS Khusus untuk menyembunyikan scrollbar di Slider Galeri */}
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ========================================= */}
      {/* 1. HERO SECTION - Dinamis dari Admin      */}
      {/* ========================================= */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white px-5 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-30 transform -translate-x-1/2 -translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-10 md:pt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-100 text-[10px] md:text-[11px] font-bold tracking-wider uppercase mb-5 md:mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 animate-pulse"></span>
            Konsultan & Kuasa Hukum Pajak Brevet C
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[56px] font-extrabold mb-4 md:mb-5 leading-tight tracking-tight whitespace-pre-wrap">
            {heroTitle}
          </h1>

          <p className="text-[13px] md:text-[15px] font-light mb-8 md:mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed px-2 md:px-0 whitespace-pre-wrap">
            {heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
            <Link
              href="/layanan"
              className="bg-white text-blue-900 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-[13px] md:text-[14px] hover:bg-blue-50 transition-colors shadow-lg text-center w-full sm:w-auto"
            >
              Eksplorasi Layanan
            </Link>
            <a
              href={`https://wa.me/${waConsultant}?text=${encodeURIComponent("Halo Tim MNCo Juara, saya mengunjungi website Anda dan ingin berkonsultasi mengenai bisnis saya.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800/50 text-white border border-blue-400/30 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-[13px] md:text-[14px] hover:bg-blue-800 transition-colors text-center w-full sm:w-auto"
            >
              Hubungi Konsultan
            </a>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 2. DETAIL MNCO GROUP (Accordion HTML5)    */}
      {/* ========================================= */}
      <section className="py-12 md:py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="order-2 md:order-1 md:sticky md:top-24">
              <h2 className="text-[11px] md:text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
                Mengenal MNCo Group
              </h2>
              <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
                Jaringan Profesional Pajak Berlisensi Resmi.
              </h3>
              <div className="space-y-4 text-slate-600 text-[13px] md:text-[15px] leading-relaxed">
                <p>
                  <strong>MNCo Group</strong> bukanlah sekadar biro administrasi
                  biasa. Kami adalah firma profesional yang memegang lisensi
                  resmi sebagai{" "}
                  <strong>Konsultan Pajak Bersertifikat Brevet C</strong>{" "}
                  (tingkat sertifikasi tertinggi) dan merupakan{" "}
                  <strong>Kuasa Hukum Pajak</strong> yang terdaftar sah di
                  Pengadilan Pajak.
                </p>
                <ul className="space-y-2 mt-4 text-[13px] md:text-[14px] font-medium text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-bold shrink-0">✓</span>{" "}
                    Pendampingan Pemeriksaan & Sengketa Pajak
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-bold shrink-0">✓</span>{" "}
                    Perencanaan Pajak (Tax Planning) Strategis
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-blue-600 font-bold shrink-0">✓</span>{" "}
                    Kepatuhan & Pelaporan SPT Masa/Tahunan
                  </li>
                </ul>
              </div>
            </div>

            {/* Bagian Accordion Buka-Tutup tanpa Client Component */}
            <div className="order-1 md:order-2 bg-[#F8FAFC] p-5 md:p-8 rounded-2xl border border-slate-100 shadow-inner">
              <div className="space-y-3">
                {features.map((feature) => (
                  <details
                    key={feature.id}
                    className="group bg-transparent rounded-xl border border-transparent transition-all duration-300 open:bg-white open:border-blue-200 open:shadow-[0_2px_12px_rgb(0,0,0,0.04)] [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex items-center gap-3.5 md:gap-4 p-3 md:p-4 cursor-pointer list-none focus:outline-none hover:bg-slate-50/50 rounded-xl group-open:hover:bg-transparent">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 font-extrabold text-[15px] md:text-base transition-colors duration-300 bg-slate-200 text-slate-500 group-open:bg-blue-600 group-open:text-white group-open:shadow-sm">
                        {feature.id}
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <h4 className="text-[14px] md:text-[15px] font-bold text-slate-700 group-open:text-blue-700 transition-colors">
                          {feature.title}
                        </h4>
                        <svg
                          className="w-4 h-4 text-slate-400 transform transition-transform duration-300 group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </summary>

                    <div className="pl-[56px] md:pl-[72px] pr-4 pb-4 md:pb-5 text-slate-600 text-[12px] md:text-[13px] leading-relaxed animate-fade-in-down">
                      {feature.desc}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 3. GALERI KANTOR (CSS Scroll Snap Slider) */}
      {/* ========================================= */}
      <section className="py-12 md:py-16 px-5 bg-[#F8FAFC] border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-[11px] md:text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              Galeri Kami
            </h2>
            <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Suasana & Fasilitas Kantor
            </h3>
            <p className="text-slate-500 max-w-2xl mx-auto text-[13px] md:text-sm leading-relaxed px-2">
              Geser untuk melihat ruang konsultasi yang kami rancang nyaman,
              privat, dan profesional.
            </p>
          </div>

          {/* Slider Container - Pure CSS Scroll Snap */}
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scroll gap-4 md:gap-6 pb-6 pt-2 px-2">
            {gallery.map((img) => (
              <div
                key={img.id}
                className="snap-center shrink-0 w-[90%] md:w-[70%] h-60 md:h-[400px] relative rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-slate-200 bg-slate-200"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-5 md:p-8 w-full">
                  <span className="bg-blue-600 text-white text-[9px] md:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    {img.label}
                  </span>
                  <h4 className="text-white font-bold text-lg md:text-2xl">
                    {img.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/kontak"
              className="inline-flex items-center gap-1.5 text-[13px] md:text-[14px] text-blue-600 font-bold hover:text-blue-800 transition-colors bg-blue-50 px-5 py-2 rounded-full border border-blue-100 hover:border-blue-200"
            >
              Lihat Peta Lokasi Kami
              <svg
                className="w-3.5 h-3.5 md:w-4 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
