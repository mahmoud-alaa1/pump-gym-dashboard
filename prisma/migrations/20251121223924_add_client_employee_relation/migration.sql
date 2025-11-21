/*
  Warnings:

  - You are about to drop the column `created_by` on the `Client` table. All the data in the column will be lost.

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
    "code" TEXT NOT NULL,
    "payment_type" TEXT NOT NULL,
    "visitors" TEXT NOT NULL,
    "created_by_id" INTEGER,
    "gender" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Client_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("client_name", "code", "created_at", "gender", "id", "payment", "payment_type", "phone", "subscription_type", "visitors") SELECT "client_name", "code", "created_at", "gender", "id", "payment", "payment_type", "phone", "subscription_type", "visitors" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
