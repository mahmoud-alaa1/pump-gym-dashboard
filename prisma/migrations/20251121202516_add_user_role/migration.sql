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
    "created_by" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Client" ("client_name", "code", "created_at", "created_by", "gender", "id", "payment", "payment_type", "phone", "subscription_type", "visitors") SELECT "client_name", "code", "created_at", "created_by", "gender", "id", "payment", "payment_type", "phone", "subscription_type", "visitors" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
