import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function KontakPage() {
  // 1. Tarik data dari database
  const setting = await prisma.webSetting.findFirst();

  const addressPusat =
    setting?.addressPusat || "Gawanan, Sukoharjo, Jawa Tengah";
  const addressCabang =
    setting?.addressCabang || "Jl. Pleburan VI, Kota Semarang, Jawa Tengah";

  // Nomor untuk ditampillkan di samping Alamat/Maps (Kantor Umum)
  const rawWa = setting?.waNumber || "6281229894433";
  const displayWa = rawWa.startsWith("62")
    ? "0" + rawWa.slice(2).replace(/(\d{3,4})(\d{4})(\d+)/, "$1-$2-$3")
    : rawWa;

  // Nomor Konsultan untuk tombol Chat CTA Biru di paling bawah
  const waConsultant = setting?.waConsultant || rawWa;

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      <section className="py-12 md:py-16 px-5 max-w-5xl mx-auto">
        {/* Header Judul */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-[11px] md:text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">
            Hubungi Kami
          </h1>
          <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Kunjungi Kantor Layanan Kami
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[13px] md:text-[14px]">
            Pilih kantor cabang terdekat dengan Anda untuk berkonsultasi
            langsung dengan tim profesional kami.
          </p>
        </div>

        {/* Grid 2 Kantor Cabang */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* 1. KANTOR PUSAT - SUKOHARJO */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow duration-300">
            <div className="p-6 md:p-8 flex-1">
              <span className="bg-blue-100 text-blue-600 font-bold text-[9px] md:text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Kantor Pusat
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-3 mb-2">
                MNCo Juara Sukoharjo
              </h3>
              <p className="text-slate-500 text-[12px] md:text-[13px] mb-5 leading-relaxed">
                Pusat layanan konsultasi pajak korporat, sengketa pajak, dan
                pendampingan hukum wilayah Soloraya.
              </p>

              <ul className="space-y-3.5 text-slate-700 text-[13px]">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <span className="leading-relaxed mt-0.5 whitespace-pre-wrap">
                    {addressPusat}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <strong className="text-slate-900">{displayWa}</strong>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <span>Senin - Jumat | 08:00 - 17:00 WIB</span>
                </li>
              </ul>
            </div>
            {/* Google Maps Sukoharjo */}
            <div className="h-48 md:h-56 w-full border-t border-slate-200">
              <iframe
                src="https://maps.google.com/maps?q=MNCo%20Juara,%20Gawanan,%20Sukoharjo,%20Kabupaten%20Sukoharjo,%20Jawa%20Tengah%2057512&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* 2. KANTOR CABANG - SEMARANG */}
          <div className="bg-[#F8FAFC] rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow duration-300">
            <div className="p-6 md:p-8 flex-1">
              <span className="bg-blue-100 text-blue-600 font-bold text-[9px] md:text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Kantor Cabang
              </span>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-3 mb-2">
                MNCo Semarang
              </h3>
              <p className="text-slate-500 text-[12px] md:text-[13px] mb-5 leading-relaxed">
                Melayani kebutuhan perpajakan, pelaporan SPT, dan audit
                perusahaan strategis di wilayah Kota Semarang.
              </p>

              <ul className="space-y-3.5 text-slate-700 text-[13px]">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <span className="leading-relaxed mt-0.5 whitespace-pre-wrap">
                    {addressCabang}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <strong className="text-slate-900">{displayWa}</strong>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-blue-500 flex items-center justify-center shrink-0 shadow-sm">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <span>Senin - Jumat | 08:00 - 17:00 WIB</span>
                </li>
              </ul>
            </div>
            {/* Google Maps Semarang */}
            <div className="h-48 md:h-56 w-full border-t border-slate-200">
              <iframe
                src="https://maps.google.com/maps?q=Jl.%20Pleburan%20VI%20No.18A,%20Pleburan,%20Kec.%20Semarang%20Sel.,%20Kota%20Semarang,%20Jawa%20Tengah%2050241&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
