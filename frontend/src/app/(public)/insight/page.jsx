import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic"; // Wajib agar selalu menarik data terbaru dari database

export default async function InsightPublicPage() {
  // Menarik semua artikel dari database Admin
  const insights = await prisma.insight.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans text-slate-800 pb-20 md:pb-28">
      {/* HEADER */}
      <section className="bg-slate-900 text-white pt-20 md:pt-28 pb-24 md:pb-32 px-5 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-[10px] md:text-[11px] font-bold tracking-widest uppercase mb-5">
            Edukasi & Berita
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight">
            Insight Perpajakan
          </h1>
          <p className="text-slate-400 text-[13px] md:text-[15px] leading-relaxed max-w-2xl mx-auto">
            Temukan pembaruan regulasi, tips perencanaan pajak, dan wawasan
            bisnis terbaru.
          </p>
        </div>
      </section>

      {/* DAFTAR ARTIKEL DARI DATABASE */}
      <section className="max-w-6xl mx-auto px-5 -mt-16 md:-mt-20 relative z-20">
        {insights.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center shadow-lg border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Belum Ada Artikel
            </h3>
            <p className="text-slate-500 text-[13px]">
              Kumpulan insight dan berita sedang disiapkan oleh tim ahli kami.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {insights.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col overflow-hidden h-full group"
              >
                {/* Gambar Sampul */}
                <div className="h-48 md:h-56 bg-slate-100 relative overflow-hidden">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {post.category}
                  </div>
                </div>

                {/* Konten Teks */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <p className="text-[11px] text-slate-400 font-bold mb-3 uppercase tracking-wider">
                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-[17px] md:text-[19px] font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-blue-600 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-[13px] md:text-[14px] leading-relaxed flex-1 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Link ke halaman baca */}
                  <div className="mt-auto pt-5 border-t border-slate-100">
                    <Link
                      href={`/insight/${post.id}`}
                      className="inline-flex items-center gap-2 text-[12px] md:text-[13px] font-bold text-blue-600 group-hover:text-blue-800"
                    >
                      Baca Selengkapnya ➔
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
