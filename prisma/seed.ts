import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const plainPassword = "123456789";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const admin = await prisma.employee.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "Mostafe Saber",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created:", admin);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
