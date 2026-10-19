"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. Ambil semua artikel
export async function getInsights() {
  return await prisma.insight.findMany({
    orderBy: { createdAt: "desc" }, // Yang terbaru tampil duluan
  });
}

// 2. Simpan atau Update Artikel
export async function saveInsight(id, formData) {
  const data = {
    title: formData.get("title"),
    category: formData.get("category"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    imageUrl: formData.get("imageUrl") || null, // Opsional
  };

  if (id) {
    // Jika ada ID, berarti UPDATE (Edit)
    await prisma.insight.update({ where: { id }, data });
  } else {
    // Jika tidak ada ID, berarti CREATE (Baru)
    await prisma.insight.create({ data });
  }

  // Refresh cache halaman publik dan admin
  revalidatePath("/insight");
  revalidatePath("/admin/insight");
}

// 3. Hapus Artikel
export async function deleteInsight(id) {
  await prisma.insight.delete({ where: { id } });
  revalidatePath("/insight");
  revalidatePath("/admin/insight");
}
