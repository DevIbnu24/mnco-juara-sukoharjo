import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Fungsi untuk mengambil data layanan (GET)
export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(services);
}

// Fungsi admin untuk menambah layanan baru (POST)
export async function POST(request) {
  const data = await request.json();
  const newService = await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
    },
  });
  return NextResponse.json(newService, { status: 201 });
}
