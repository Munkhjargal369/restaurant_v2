/*
  Warnings:

  - You are about to drop the `Cumtomer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliveryWorker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deliver" DROP CONSTRAINT "Deliver_deliverWorkerId_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "customerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Cumtomer";

-- DropTable
DROP TABLE "DeliveryWorker";

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliverWorker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,

    CONSTRAINT "DeliverWorker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeliverWorker_email_key" ON "DeliverWorker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeliverWorker_phone_key" ON "DeliverWorker"("phone");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_deliverWorkerId_fkey" FOREIGN KEY ("deliverWorkerId") REFERENCES "DeliverWorker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
