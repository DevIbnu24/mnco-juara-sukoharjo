"use client";

import { useState, useEffect } from "react";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "./actions";

export default function KelolaLayanan() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk form
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fungsi memuat data dari database
  const loadData = async () => {
    setIsLoading(true);
    const data = await getServices();
    setServices(data);
    setIsLoading(false);
  };

  // Jalankan loadData saat halaman pertama kali dibuka
  useEffect(() => {
    loadData();
  }, []);

  // Fungsi saat tombol Simpan ditekan
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (editId) {
      await updateService(editId, formData); // Proses Edit
      setEditId(null);
    } else {
      await addService(formData); // Proses Tambah Baru
    }

    // Kosongkan form dan muat ulang data
    setTitle("");
    setDescription("");
    loadData();
  };

  // Fungsi saat tombol Edit ditekan
  const handleEdit = (service) => {
    setEditId(service.id);
    setTitle(service.title);
    setDescription(service.description);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Gulir ke atas otomatis
  };

  // Fungsi saat tombol Hapus ditekan
  const handleDelete = async (id) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menghapus layanan ini? Data yang terhapus tidak bisa dikembalikan.",
      )
    ) {
      await deleteService(id);
      loadData();
    }
  };

  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Kelola Layanan
        </h1>
        <p className="text-slate-500 text-[13px] md:text-sm mt-1">
          Tambah, ubah, atau hapus daftar layanan yang tampil di website publik.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* PANEL KIRI: FORM INPUT */}
        <div className="lg:col-span-4 bg-white rounded-2xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 p-6 sticky top-6 transition-all duration-300">
          <h2 className="text-[15px] font-bold text-slate-800 mb-5 pb-4 border-b border-slate-100 flex items-center gap-2">
            {editId ? (
              <>
                <svg
                  className="w-5 h-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                Edit Layanan
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Tambah Layanan Baru
              </>
            )}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nama Layanan
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-slate-200 p-3 rounded-xl text-[13px] md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white"
                placeholder="Contoh: Konsultasi Pajak"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Deskripsi Layanan
              </label>
              <textarea
                required
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-slate-200 p-3 rounded-xl text-[13px] md:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white resize-none"
                placeholder="Jelaskan detail layanan ini..."
              ></textarea>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className={`flex-1 text-white font-bold py-2.5 rounded-xl text-[13px] transition-colors shadow-sm ${
                  editId
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {editId ? "Simpan Perubahan" : "Simpan Layanan"}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="px-5 py-2.5 bg-slate-100 text-slate-600 text-[13px] font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PANEL KANAN: DAFTAR LAYANAN */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] border border-slate-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h2 className="text-[14px] md:text-[15px] font-bold text-slate-800">
                Daftar Layanan Tersimpan
              </h2>
              <span className="bg-blue-100 text-blue-700 text-[10px] md:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {services.length} Total
              </span>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-slate-500 text-[13px]">
                    Memuat data dari database...
                  </p>
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                  <svg
                    className="w-12 h-12 text-slate-300 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    ></path>
                  </svg>
                  <p className="text-slate-500 text-[13px]">
                    Belum ada data layanan.
                  </p>
                  <p className="text-slate-400 text-[12px] mt-1">
                    Silakan tambah melalui form di sebelah kiri.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="group flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="mb-6">
                        <h3 className="text-[14px] md:text-[15px] font-bold text-slate-900 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-slate-500 text-[12px] md:text-[13px] mt-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex gap-2 justify-start mt-auto pt-4 border-t border-slate-100">
                        <button
                          onClick={() => handleEdit(service)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 text-[11px] md:text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors"
                        >
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
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            ></path>
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-[11px] md:text-xs font-bold rounded-lg hover:bg-red-100 transition-colors"
                        >
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
