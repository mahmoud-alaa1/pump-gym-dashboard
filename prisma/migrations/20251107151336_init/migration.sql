-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client_name" TEXT NOT NULL,
    "subscription_type" TEXT NOT NULL,
    "payment" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "visitor_source" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
