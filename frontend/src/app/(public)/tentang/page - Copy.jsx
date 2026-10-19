"use client";

import { useState } from "react";

export default function TentangPage() {
  // State untuk mengontrol Accordion (Buka-Tutup) Struktur Organisasi
  // Default: Semua tertutup, kecuali jika ingin ada yang dibuka dari awal
  const [openTiers, setOpenTiers] = useState({});

  const toggleTier = (id) => {
    setOpenTiers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Data Struktur Organisasi yang sudah dikelompokkan
  const orgData = [
    {
      id: "tier1",
      title: "Managing Partner",
      members: [
        {
          name: "Jafar Shodiq",
          credentials: "S.Akt., M.Ak., BKP, CTT",
          role: "Managing Partner",
        },
      ],
    },
    {
      id: "tier2",
      title: "Jajaran Partner",
      members: [
        {
          name: "Mukh Nurkholis",
          credentials: "SE., Ak., BKP., CA.",
          role: "Partner",
        },
        {
          name: "Arif Nurman Hakim",
          credentials: "S.E., Ak., BKP., CA.",
          role: "Partner",
        },
        {
          name: "Jumiana",
          credentials: "SE., Ak., BKP., CA., CTA",
          role: "Partner",
        },
      ],
    },
    {
      id: "tier3",
      title: "Manajemen Inti",
      members: [
        {
          name: "Rika Arindina Wati",
          credentials: "S.Ak., BKP., CTA",
          role: "Manager",
        },
        {
          name: "Haryo Nurpriambodo",
          credentials: "A.Md. Ak., BKP., CAAT., CADE., CTT",
          role: "Ketua Tim",
        },
      ],
    },
    {
      id: "tier4",
      title: "Tim Konsultan & Spesialis",
      members: [
        {
          name: "Annissa Nuur Cahyani",
          credentials: "S.Tr. Ak., BKP., CAT., CTT",
          role: "Finance & Consulting",
        },
        {
          name: "Trias Adi Sasongko",
          credentials: "A.Md",
          role: "HRD & Consulting",
        },
        {
          name: "Dike Wahyu Amarullah",
          credentials: "A.Md. CTT",
          role: "Accounting & Consulting",
        },
        {
          name: "Hafizh Mumayiz Inadi",
          credentials: "S.Tr. Ak., CTT",
          role: "Consulting",
        },
        {
          name: "Nabila Rahmah Adiningtyas",
          credentials: "S. Ak",
          role: "Consulting",
        },
        {
          name: "Indra Pratama Sujatmika",
          credentials: "",
          role: "Consulting",
        },
        {
          name: "Raden Susilo Firmansyah & Taufik Zain",
          credentials: "",
          role: "Consulting",
        },
        {
          name: "Firda Agung Setyo Nugroho",
          credentials: "A.Md",
          role: "Consulting",
        },
      ],
    },
  ];

  return (
    <div className="bg-white overflow-hidden font-sans text-slate-800">
      {/* BAGIAN PROFIL & VISI MISI */}
      <section className="py-12 md:py-16 px-5 max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-[11px] md:text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
            Tentang Kami
          </h1>
          <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mitra Strategis Finansial Anda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <div className="md:col-span-5 text-slate-600 text-[13px] md:text-[15px] leading-relaxed">
            <p className="mb-4">
              MNCo Juara merupakan bagian dari jaringan profesional{" "}
              <strong>MNCo Group</strong>. Kami hadir memberikan kepastian dan
              keamanan dalam mengelola kewajiban perpajakan Anda.
            </p>
            <p>
              Didukung oleh tim praktisi, konsultan bersertifikat, dan kuasa
              hukum pajak yang berpengalaman, kami memastikan setiap keputusan
              finansial bisnis Anda sesuai dengan regulasi perpajakan yang
              dinamis.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 md:p-6 rounded-xl border border-slate-100">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Visi Kami
              </h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Menjadi firma konsultan pajak terdepan yang menjunjung tinggi
                integritas, profesionalisme, dan edukasi masyarakat.
              </p>
            </div>

            <div className="bg-slate-50 p-5 md:p-6 rounded-xl border border-slate-100">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Misi Kami
              </h3>
              <ul className="text-slate-500 text-[13px] leading-relaxed space-y-1.5">
                <li>• Memberikan solusi tepat guna.</li>
                <li>• Melindungi hak klien dalam sengketa.</li>
                <li>• Edukasi SDM yang berkualitas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BAGIAN STRUKTUR ORGANISASI INTERAKTIF */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 px-5 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[11px] md:text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
              Struktur Organisasi
            </h2>
            <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Tim Ahli & Profesional Kami
            </h3>
            <p className="text-slate-500 text-[13px] md:text-sm">
              Klik pada masing-masing divisi di bawah ini untuk melihat detail
              tim kami.
            </p>
          </div>

          {/* List Accordion Struktur */}
          <div className="space-y-3 md:space-y-4">
            {orgData.map((tier) => (
              <div
                key={tier.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Tombol Header (Klik untuk Buka/Tutup) */}
                <button
                  onClick={() => toggleTier(tier.id)}
                  className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        ></path>
                      </svg>
                    </div>
                    <span className="font-bold text-slate-800 text-[14px] md:text-[15px]">
                      {tier.title}
                    </span>
                  </div>
                  <div
                    className={`text-slate-400 transition-transform duration-300 ${openTiers[tier.id] ? "rotate-180" : ""}`}
                  >
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
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </button>

                {/* Konten Data Anggota (Grid 2 Kolom) */}
                <div
                  className={`transition-all duration-300 ease-in-out border-t border-slate-100 ${
                    openTiers[tier.id]
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0 border-transparent"
                  }`}
                >
                  {/* Grid di sini diatur agar minimal 1 kolom di HP kecil, tapi memprioritaskan 2 kolom (sm:grid-cols-2) */}
                  <div className="p-4 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tier.members.map((member, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-lg border border-slate-200 shadow-[0_1px_2px_rgb(0,0,0,0.02)]"
                      >
                        <p className="text-blue-600 font-bold text-[9px] uppercase tracking-wider mb-1">
                          {member.role}
                        </p>
                        <h4 className="text-[13px] font-bold text-slate-900 leading-tight">
                          {member.name}
                        </h4>
                        {member.credentials && (
                          <p className="text-slate-500 text-[10px] mt-0.5 font-medium">
                            {member.credentials}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
