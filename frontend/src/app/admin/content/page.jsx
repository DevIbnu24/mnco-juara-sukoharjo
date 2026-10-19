"use client"; // Menandakan ini adalah komponen interaktif (berjalan di browser)
import { useState } from "react";

export default function AdminContentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Menyimpan...");

    // Mengirim data ke API Backend yang kita buat di langkah 2
    const res = await fetch("/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      setStatus("Layanan berhasil ditambahkan!");
      setTitle("");
      setDescription("");
    } else {
      setStatus("Gagal menyimpan data.");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Admin - Kelola Layanan
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nama Layanan</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Misal: Tinjauan Pajak Tahunan"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded h-32"
            placeholder="Jelaskan detail layanan ini..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
        >
          Simpan ke Website
        </button>

        {status && (
          <p className="mt-4 text-sm text-green-600 font-semibold">{status}</p>
        )}
      </form>
    </div>
  );
}
