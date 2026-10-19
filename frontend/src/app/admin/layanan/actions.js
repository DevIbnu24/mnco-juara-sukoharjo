"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// 1. BACA DATA (READ)
export async function getServices() {
  const data = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });

  return data.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));
}

// 2. TAMBAH DATA (CREATE)
export async function addService(formData) {
  await prisma.service.create({
    data: {
      title: formData.get("title"),
      description: formData.get("description"),
    },
  });

  // Refresh halaman publik & admin otomatis
  revalidatePath("/");
  revalidatePath("/layanan");
  revalidatePath("/admin/layanan");
}

// 3. UBAH DATA (UPDATE)
export async function updateService(id, formData) {
  await prisma.service.update({
    where: { id },
    data: {
      title: formData.get("title"),
      description: formData.get("description"),
    },
  });

  revalidatePath("/");
  revalidatePath("/layanan");
  revalidatePath("/admin/layanan");
}

// 4. HAPUS DATA (DELETE)
export async function deleteService(id) {
  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/layanan");
  revalidatePath("/admin/layanan");
}
