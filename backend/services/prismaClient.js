const { PrismaClient } = require("@prisma/client");

// Mencegah multiple instance saat menggunakan nodemon
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

module.exports = prisma;
