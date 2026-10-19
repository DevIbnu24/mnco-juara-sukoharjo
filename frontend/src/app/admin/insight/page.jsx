"use client";
import { useState, useEffect } from "react";
import { getInsights, saveInsight, deleteInsight } from "./actions";
import dynamic from "next/dynamic";

// Memanggil CSS bawaan Quill agar tampilannya rapi
import "react-quill-new/dist/quill.snow.css";

// WAJIB di Next.js: Dynamic import agar tidak error SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// Konfigurasi Toolbar ala Blogspot/WordPress
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Heading 1-6
    [{ font: [] }], // Jenis Font
    ["bold", "italic", "underline", "strike", "blockquote"], // Format teks
    [{ list: "ordered" }, { list: "bullet" }], // List angka & titik
    [{ script: "sub" }, { script: "super" }], // Subscript / Superscript
    [{ indent: "-1" }, { indent: "+1" }], // Indentasi
    [{ align: [] }], // Rata kiri, tengah, kanan
    [{ color: [] }, { background: [] }], // Warna teks & highlight
    ["link", "image", "video"], // Insert Link, Gambar, Video
    ["clean"], // Tombol hapus format
  ],
};

export default function AdminInsightPage() {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Pajak Korporat",
    excerpt: "",
    content: "",
    imageUrl: "",
  });

  const loadData = async () => {
    setIsLoading(true);
    const data = await getInsights();
    setInsights(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleNewPost = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Pajak Korporat",
      excerpt: "",
      content: "",
      imageUrl: "",
    });
    setIsFormOpen(true);
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || "",
    });
    setIsFormOpen(true);
  };

  const closeEditor = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handler KHUSUS untuk React Quill
  const handleContentChange = (content) =>
    setFormData({ ...formData, content });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content || formData.content === "<p><br></p>") {
      alert("Isi konten artikel tidak boleh kosong!");
      return;
    }
    setIsSaving(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("excerpt", formData.excerpt);
    data.append("content", formData.content);
    data.append("imageUrl", formData.imageUrl);

    await saveInsight(editingId, data);
    setIsSaving(false);
    closeEditor();
    loadData();
  };

  const handleDelete = async (id) => {
    if (
      confirm("Apakah Anda yakin ingin menghapus artikel ini secara permanen?")
    ) {
      await deleteInsight(id);
      loadData();
    }
  };

  if (isFormOpen) {
    return (
      <div className="max-w-6xl mx-auto font-sans pb-20">
        {/* CSS Tambahan agar Quill Editor memenuhi tinggi layar */}
        <style>{`
          .quill-editor-container .ql-container {
            height: 500px;
            font-size: 15px;
            font-family: inherit;
            border-bottom-left-radius: 0.75rem;
            border-bottom-right-radius: 0.75rem;
            background-color: white;
          }
          .quill-editor-container .ql-toolbar {
            border-top-left-radius: 0.75rem;
            border-top-right-radius: 0.75rem;
            background-color: #f8fafc;
          }
        `}</style>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <button
              onClick={closeEditor}
              className="text-slate-500 hover:text-slate-800 transition-colors p-2 bg-white rounded-full border border-slate-200 shadow-sm"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
            <h1 className="text-xl font-extrabold text-slate-900">
              {editingId ? "Edit Artikel" : "Tulis Artikel Baru"}
            </h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 shadow-lg transition-all disabled:bg-slate-400 flex items-center gap-2"
          >
            {isSaving ? "Menyimpan..." : "Publikasikan Artikel"}
            {!isSaving && (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full text-3xl font-extrabold text-slate-900 placeholder-slate-300 border-none bg-transparent focus:outline-none focus:ring-0 px-0"
              placeholder="Ketik Judul Artikel di Sini..."
            />

            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows="2"
              className="w-full text-lg text-slate-500 placeholder-slate-300 border-none bg-transparent focus:outline-none focus:ring-0 px-0 resize-none leading-relaxed"
              placeholder="Tuliskan ringkasan singkat (excerpt) untuk memancing pembaca..."
            ></textarea>

            {/* EDITOR SAKTI REACT-QUILL */}
            <div className="quill-editor-container rounded-xl shadow-sm border border-slate-200">
              <ReactQuill
                theme="snow"
                modules={quillModules}
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Mulai menulis cerita Anda di sini... (Blok teks untuk menebalkan atau mengubah gaya)"
              />
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-[13px] font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
                Pengaturan Publikasi
              </h3>

              <div className="mb-5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                  Kategori Artikel
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-3 rounded-xl text-[13px] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Pajak Korporat">Pajak Korporat</option>
                  <option value="Hukum Pajak">Hukum Pajak</option>
                  <option value="Berita Regulasi">Berita Regulasi</option>
                  <option value="Perencanaan Keuangan">
                    Perencanaan Keuangan
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                  URL Gambar Utama / Sampul
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full border border-slate-200 p-3 rounded-xl text-[13px] bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 mb-3"
                  placeholder="https://contoh.com/gambar.jpg"
                />

                {formData.imageUrl ? (
                  <div className="w-full h-40 rounded-xl border border-slate-200 overflow-hidden relative group">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=URL+Gambar+Gagal+Dimuat";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-24 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                    <svg
                      className="w-6 h-6 mb-1"
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
                    <span className="text-[10px]">Belum ada gambar</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto font-sans pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Insight
          </h1>
          <p className="text-slate-500 text-[13px] md:text-sm mt-1">
            Kelola publikasi artikel, berita, dan edukasi perpajakan Anda.
          </p>
        </div>
        <button
          onClick={handleNewPost}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
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
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Tulis Artikel Baru
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-500">
          Memuat artikel...
        </div>
      ) : insights.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Belum Ada Artikel
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            Anda belum memublikasikan insight apapun. Mulai tulis artikel
            pertama Anda untuk klien!
          </p>
          <button
            onClick={handleNewPost}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-800"
          >
            Tulis Sekarang
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
            >
              <div className="h-40 bg-slate-100 relative overflow-hidden">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-[11px] text-slate-400 font-medium mb-2 flex items-center gap-1.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {new Date(post.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-[16px] font-bold text-slate-900 mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[13px] text-slate-500 line-clamp-2 flex-1 mb-5 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex-1 bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-[12px] font-bold py-2 rounded-lg transition-colors border border-slate-100"
                  >
                    Edit Artikel
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-lg transition-colors border border-slate-100"
                    title="Hapus"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
