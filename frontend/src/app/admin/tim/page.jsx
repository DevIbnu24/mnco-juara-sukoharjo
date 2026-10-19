"use client";
import { useState, useEffect } from "react";
import {
  getTeam,
  addTeamMember,
  editTeamMember,
  deleteTeamMember,
  seedDefaultTeam,
} from "./actions";

export default function KelolaTimPage() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    credentials: "",
    role: "",
    category: "",
  });

  const loadData = async () => {
    setIsLoading(true);
    const data = await getTeam();
    setTeam(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditClick = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      credentials: member.credentials || "",
      role: member.role,
      category: member.category,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", credentials: "", role: "", category: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("credentials", formData.credentials);
    data.append("role", formData.role);
    data.append("category", formData.category);

    if (editingId) {
      await editTeamMember(editingId, data);
    } else {
      await addTeamMember(data);
    }
    cancelEdit();
    loadData();
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus anggota tim ini?")) {
      await deleteTeamMember(id);
      if (editingId === id) cancelEdit();
      loadData();
    }
  };

  // Fungsi Tombol Import
  const handleImport = async () => {
    setIsLoading(true);
    await seedDefaultTeam();
    loadData();
  };

  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Kelola Tim & Organisasi
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Tambahkan, ubah, atau hapus anggota tim yang tampil di halaman Tentang
          Kami.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* KIRI: FORM TAMBAH / EDIT */}
        <div
          className={`lg:col-span-4 rounded-2xl shadow-sm border p-6 sticky top-6 transition-colors ${editingId ? "bg-blue-50 border-blue-200" : "bg-white border-slate-100"}`}
        >
          <h2
            className={`text-[15px] font-bold mb-5 pb-4 border-b flex items-center gap-2 ${editingId ? "text-blue-800 border-blue-200" : "text-slate-800 border-slate-100"}`}
          >
            {editingId ? "Ubah Data Anggota" : "Tambah Anggota Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="Contoh: Jafar Shodiq"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Gelar (Opsional)
              </label>
              <input
                type="text"
                name="credentials"
                value={formData.credentials}
                onChange={handleChange}
                className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="Contoh: S.Akt., M.Ak., BKP"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Jabatan
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                placeholder="Contoh: Managing Partner"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                Kelompok Struktur
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 p-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              >
                <option value="">-- Pilih Kelompok --</option>
                <option value="Managing Partner">Managing Partner</option>
                <option value="Jajaran Partner">Jajaran Partner</option>
                <option value="Manajemen Inti">Manajemen Inti</option>
                <option value="Tim Konsultan & Spesialis">
                  Tim Konsultan & Spesialis
                </option>
              </select>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className={`w-full text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors ${editingId ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {editingId ? "Simpan Perubahan" : "Simpan ke Website"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full bg-slate-200 text-slate-700 px-4 py-3 rounded-xl hover:bg-slate-300 font-bold text-sm transition-colors"
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* KANAN: DAFTAR TIM */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-[15px] font-bold text-slate-800">
                Daftar Anggota
              </h2>
              <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-full">
                {team.length} Anggota
              </span>
            </div>

            {/* Tombol Ajaib Import Data */}
            {team.length === 0 && !isLoading && (
              <button
                onClick={handleImport}
                className="bg-green-600 hover:bg-green-700 text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm animate-pulse"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
                Import Data Tim Bawaan
              </button>
            )}
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
              <p className="text-slate-500 text-sm">Memuat data...</p>
            ) : team.length === 0 ? (
              <p className="text-slate-500 text-sm">
                Belum ada anggota tim. Klik tombol hijau di atas untuk
                memasukkan data awal.
              </p>
            ) : (
              team.map((member) => (
                <div
                  key={member.id}
                  className={`group p-4 border rounded-xl transition-colors relative ${editingId === member.id ? "border-orange-400 bg-orange-50/30" : "border-slate-200 hover:border-blue-300"}`}
                >
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-2 inline-block uppercase tracking-wider">
                    {member.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {member.role}{" "}
                    {member.credentials && `• ${member.credentials}`}
                  </p>

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditClick(member)}
                      className="text-orange-500 hover:text-orange-700 bg-white shadow-sm p-1.5 rounded-md border border-slate-100"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-500 hover:text-red-700 bg-white shadow-sm p-1.5 rounded-md border border-slate-100"
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
