"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getTeam() {
  return await prisma.teamMember.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function addTeamMember(formData) {
  await prisma.teamMember.create({
    data: {
      name: formData.get("name"),
      credentials: formData.get("credentials") || "",
      role: formData.get("role"),
      category: formData.get("category"),
    },
  });
  revalidatePath("/tentang");
  revalidatePath("/admin/tim");
}

export async function editTeamMember(id, formData) {
  await prisma.teamMember.update({
    where: { id },
    data: {
      name: formData.get("name"),
      credentials: formData.get("credentials") || "",
      role: formData.get("role"),
      category: formData.get("category"),
    },
  });
  revalidatePath("/tentang");
  revalidatePath("/admin/tim");
}

export async function deleteTeamMember(id) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/tentang");
  revalidatePath("/admin/tim");
}

// FUNGSI BARU: IMPORT DATA BAWAAN KE DATABASE
export async function seedDefaultTeam() {
  const defaultTeam = [
    {
      name: "Jafar Shodiq",
      credentials: "S.Akt., M.Ak., BKP, CTT",
      role: "Managing Partner",
      category: "Managing Partner",
    },
    {
      name: "Mukh Nurkholis",
      credentials: "SE., Ak., BKP., CA.",
      role: "Partner",
      category: "Jajaran Partner",
    },
    {
      name: "Arif Nurman Hakim",
      credentials: "S.E., Ak., BKP., CA.",
      role: "Partner",
      category: "Jajaran Partner",
    },
    {
      name: "Jumiana",
      credentials: "SE., Ak., BKP., CA., CTA",
      role: "Partner",
      category: "Jajaran Partner",
    },
    {
      name: "Rika Arindina Wati",
      credentials: "S.Ak., BKP., CTA",
      role: "Manager",
      category: "Manajemen Inti",
    },
    {
      name: "Haryo Nurpriambodo",
      credentials: "A.Md. Ak., BKP., CAAT., CADE., CTT",
      role: "Ketua Tim",
      category: "Manajemen Inti",
    },
    {
      name: "Annissa Nuur Cahyani",
      credentials: "S.Tr. Ak., BKP., CAT., CTT",
      role: "Finance & Consulting",
      category: "Tim Konsultan & Spesialis",
    },
    {
      name: "Trias Adi Sasongko",
      credentials: "A.Md",
      role: "HRD & Consulting",
      category: "Tim Konsultan & Spesialis",
    },
    {
      name: "Dike Wahyu Amarullah",
      credentials: "A.Md. CTT",
      role: "Accounting & Consulting",
      category: "Tim Konsultan & Spesialis",
    },
    {
      name: "Hafizh Mumayiz Inadi",
      credentials: "S.Tr. Ak., CTT",
      role: "Consulting",
      category: "Tim Konsultan & Spesialis",
    },
    {
      name: "Nabila Rahmah Adiningtyas",
      credentials: "S. Ak",
      role: "Consulting",
      category: "Tim Konsultan & Spesialis",
    },
    {
      name: "Indra Pratama Sujatmika",
      credentials: "",
      role: "Consulting",
      category: "Tim Konsultan & Spesialis",
    },
    {
      name: "Raden Susilo Firmansyah & Taufik Zain",
      credentials: "",
      role: "Consulting",
      category: "Tim Konsultan & Spesialis",
    },
    {
      name: "Firda Agung Setyo Nugroho",
      credentials: "A.Md",
      role: "Consulting",
      category: "Tim Konsultan & Spesialis",
    },
  ];

  // Hanya masukkan data jika database tim masih kosong
  const count = await prisma.teamMember.count();
  if (count === 0) {
    await prisma.teamMember.createMany({ data: defaultTeam });
  }

  revalidatePath("/tentang");
  revalidatePath("/admin/tim");
}
