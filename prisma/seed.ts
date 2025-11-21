import {
  PrismaClient,
  SubscriptionType,
  PaymentType,
  Visitor,
  Gender,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // === Admin employee ===
  const plainPassword = "123456789";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = await prisma.employee.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      name: "مصطفى صابر",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin created:", admin);

  // === Seed many clients ===
  const clientsData = Array.from({ length: 50 }).map((_, i) => ({
    client_name: faker.person.fullName(),
    subscription_type: faker.helpers.arrayElement(
      Object.values(SubscriptionType)
    ),
    payment: faker.number.int({ min: 100, max: 1000 }),
    phone: faker.phone.number({
      style: "international",
    }),
    code: `C${(i + 1).toString().padStart(3, "0")}`,
    payment_type: faker.helpers.arrayElement(Object.values(PaymentType)),
    visitors: faker.helpers.arrayElement(Object.values(Visitor)),
    gender: faker.helpers.arrayElement(Object.values(Gender)),
    created_by_id: admin.id,
  }));

  const clients = await prisma.client.createMany({
    data: clientsData,
  });

  console.log(`✅ ${clients.count} clients seeded`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
