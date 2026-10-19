import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function TentangPage() {
  // 1. Tarik profil sejarah dari Database
  const setting = await prisma.webSetting.findFirst();
  const aboutText = setting?.aboutText || "Profil belum diisi oleh admin.";

  // 2. Tarik Data Tim dari Database (BUKAN DATA MANUAL LAGI)
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });

  // 3. Kelompokkan anggota tim berdasarkan hierarki Accordion
  const categoryOrder = [
    { id: "tier1", title: "Managing Partner" },
    { id: "tier2", title: "Jajaran Partner" },
    { id: "tier3", title: "Manajemen Inti" },
    { id: "tier4", title: "Tim Konsultan & Spesialis" },
  ];

  // Filter agar kategori yang kosong (belum ada anggotanya di database) tidak ditampilkan
  const orgData = categoryOrder
    .map((cat) => ({
      ...cat,
      members: teamMembers.filter((m) => m.category === cat.title),
    }))
    .filter((cat) => cat.members.length > 0);

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
          <div className="md:col-span-5 text-slate-600 text-[13px] md:text-[15px] leading-relaxed whitespace-pre-wrap">
            {aboutText}
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

          <div className="space-y-3 md:space-y-4">
            {/* Tampilkan pesan jika database tim masih kosong */}
            {orgData.length === 0 && (
              <div className="text-center p-8 bg-white rounded-xl border border-slate-200">
                <p className="text-slate-500 text-sm">
                  Struktur organisasi sedang diperbarui oleh Admin.
                </p>
              </div>
            )}

            {orgData.map((tier) => (
              <details
                key={tier.id}
                className="group bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer list-none focus:outline-none">
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

                  <div className="text-slate-400 transition-transform duration-300 group-open:rotate-180">
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
                </summary>

                <div className="p-4 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100">
                  {tier.members.map((member) => (
                    <div
                      key={member.id}
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
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
