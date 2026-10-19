"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getWebSetting() {
  let setting = await prisma.webSetting.findFirst();
  if (!setting) {
    setting = {
      heroTitle: "",
      heroSubtitle: "",
      aboutText: "",
      addressPusat: "",
      addressCabang: "",
      waNumber: "",
      waConsultant: "",
    };
  }
  return setting;
}

export async function updateSingleSetting(field, value) {
  const existing = await prisma.webSetting.findFirst();

  if (existing) {
    await prisma.webSetting.update({
      where: { id: existing.id },
      data: { [field]: value },
    });
  } else {
    await prisma.webSetting.create({
      data: {
        heroTitle: field === "heroTitle" ? value : "",
        heroSubtitle: field === "heroSubtitle" ? value : "",
        aboutText: field === "aboutText" ? value : "",
        addressPusat: field === "addressPusat" ? value : "",
        addressCabang: field === "addressCabang" ? value : "",
        waNumber: field === "waNumber" ? value : "",
        waConsultant: field === "waConsultant" ? value : "",
      },
    });
  }

  revalidatePath("/", "layout"); // Refresh menyeluruh
}
