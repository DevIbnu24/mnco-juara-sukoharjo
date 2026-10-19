"use client";
import { useState, useEffect } from "react";
import { getWebSetting, updateSingleSetting } from "./actions";

export default function PengaturanWebPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [savingField, setSavingField] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    aboutText: "",
    addressPusat: "",
    addressCabang: "",
    waNumber: "",
    waConsultant: "",
  });

  useEffect(() => {
    async function loadData() {
      const data = await getWebSetting();
      if (data) setFormData({ ...data });
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async (field, label) => {
    setSavingField(field);
    setSuccessMsg("");
    await updateSingleSetting(field, formData[field]);
    setSavingField(null);
    setSuccessMsg(`${label} berhasil diperbarui!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-slate-500 font-sans">
        Memuat data pengaturan...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto font-sans pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Pengaturan Website
        </h1>
        <p className="text-slate-500 text-[13px] md:text-sm mt-1">
          Kelola konten Beranda, Tentang Kami, dan Kontak Publik.
        </p>
      </div>

      {successMsg && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-3 animate-bounce">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {successMsg}
        </div>
      )}

      <div className="space-y-6">
        {/* KOTAK 1: KONTEN BERANDA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <h2 className="text-[15px] font-bold text-slate-800 mb-5 pb-4 border-b border-slate-100 flex items-center gap-2">
            Teks Utama Beranda (Hero Section)
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[12px] font-bold text-slate-700 uppercase mb-2">
                Judul Utama (Maksimal 6-8 kata)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleChange}
                  className="flex-1 border border-slate-200 p-3 rounded-xl text-sm bg-slate-50 focus:bg-white"
                  placeholder="Contoh: Solusi Pajak Terbaik untuk Bisnis Anda"
                />
                <button
                  onClick={() => handleSave("heroTitle", "Judul Beranda")}
                  disabled={savingField === "heroTitle"}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 disabled:bg-slate-300"
                >
                  Simpan
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-bold text-slate-700 uppercase mb-2">
                Sub-judul / Deskripsi Pendek
              </label>
              <div className="flex gap-3 items-start">
                <textarea
                  name="heroSubtitle"
                  rows="3"
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  className="flex-1 border border-slate-200 p-3 rounded-xl text-sm bg-slate-50 focus:bg-white resize-none"
                  placeholder="Contoh: Kami membantu mengelola pajak perusahaan Anda..."
                ></textarea>
                <button
                  onClick={() =>
                    handleSave("heroSubtitle", "Sub-judul Beranda")
                  }
                  disabled={savingField === "heroSubtitle"}
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 disabled:bg-slate-300 h-[42px]"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KOTAK 2: PROFIL PERUSAHAAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <h2 className="text-[15px] font-bold text-slate-800 mb-5 pb-4 border-b border-slate-100 flex items-center gap-2">
            Profil & Sejarah (Tentang Kami)
          </h2>
          <textarea
            name="aboutText"
            rows="5"
            value={formData.aboutText}
            onChange={handleChange}
            className="w-full border border-slate-200 p-4 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-slate-50 focus:bg-white resize-none"
          ></textarea>
          <div className="flex justify-end mt-3">
            <button
              onClick={() => handleSave("aboutText", "Profil Perusahaan")}
              disabled={savingField === "aboutText"}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-700 disabled:bg-slate-300"
            >
              {savingField === "aboutText" ? "Menyimpan..." : "Simpan Profil"}
            </button>
          </div>
        </div>

        {/* KOTAK 3: ALAMAT & KONTAK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-[12px] font-bold text-slate-700 uppercase mb-3">
              Alamat Pusat
            </label>
            <textarea
              name="addressPusat"
              rows="3"
              value={formData.addressPusat}
              onChange={handleChange}
              className="w-full border border-slate-200 p-3 rounded-xl text-[13px] bg-slate-50 focus:bg-white resize-none"
            ></textarea>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => handleSave("addressPusat", "Alamat Pusat")}
                disabled={savingField === "addressPusat"}
                className="bg-slate-800 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-slate-900 disabled:bg-slate-300"
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-[12px] font-bold text-slate-700 uppercase mb-3">
              Alamat Cabang
            </label>
            <textarea
              name="addressCabang"
              rows="3"
              value={formData.addressCabang}
              onChange={handleChange}
              className="w-full border border-slate-200 p-3 rounded-xl text-[13px] bg-slate-50 focus:bg-white resize-none"
            ></textarea>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => handleSave("addressCabang", "Alamat Cabang")}
                disabled={savingField === "addressCabang"}
                className="bg-slate-800 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-slate-900 disabled:bg-slate-300"
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-[12px] font-bold text-slate-700 uppercase mb-3">
              Nomor WA Admin / Maps
            </label>
            <div className="flex flex-col xl:flex-row gap-3">
              <input
                type="text"
                name="waNumber"
                value={formData.waNumber}
                onChange={handleChange}
                className="flex-1 border border-slate-200 p-3 rounded-xl text-[13px] bg-slate-50 focus:bg-white"
              />
              <button
                onClick={() => handleSave("waNumber", "WA Admin")}
                disabled={savingField === "waNumber"}
                className="bg-slate-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-700 disabled:bg-slate-300"
              >
                Simpan
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <label className="block text-[12px] font-bold text-blue-700 uppercase mb-3">
              Nomor WA Konsultan
            </label>
            <div className="flex flex-col xl:flex-row gap-3">
              <input
                type="text"
                name="waConsultant"
                value={formData.waConsultant}
                onChange={handleChange}
                className="flex-1 border border-blue-200 p-3 rounded-xl text-[13px] bg-slate-50 focus:bg-white"
              />
              <button
                onClick={() => handleSave("waConsultant", "WA Konsultan")}
                disabled={savingField === "waConsultant"}
                className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-green-700 disabled:bg-slate-300"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
