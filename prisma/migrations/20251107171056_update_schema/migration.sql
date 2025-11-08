/*
  Warnings:

  - You are about to drop the column `visitor_source` on the `Client` table. All the data in the column will be lost.
  - Added the required column `visitors` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_name" TEXT NOT NULL,
    "subscription_type" TEXT NOT NULL,
    "payment" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "visitors" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Client" ("client_name", "code", "created_at", "created_by", "gender", "id", "payment", "payment_type", "phone", "subscription_type") SELECT "client_name", "code", "created_at", "created_by", "gender", "id", "payment", "payment_type", "phone", "subscription_type" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'EMPLOYEE'
);
INSERT INTO "new_Employee" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
