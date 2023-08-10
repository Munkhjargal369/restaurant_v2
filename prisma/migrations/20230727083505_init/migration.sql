/*
  Warnings:

  - You are about to drop the column `phone_number` on the `AddressDetail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Deliver` table. All the data in the column will be lost.
  - Added the required column `phone_number1` to the `AddressDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `OrderedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Delivering" AS ENUM ('yes', 'no');

-- AlterTable
ALTER TABLE "AddressDetail" DROP COLUMN "phone_number",
ADD COLUMN     "phone_number1" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Deliver" DROP COLUMN "createdAt",
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "DeliverWorker" ADD COLUMN     "status" "Delivering" NOT NULL DEFAULT 'no';

-- AlterTable
ALTER TABLE "OrderedProduct" ADD COLUMN     "amount" INTEGER NOT NULL,
ALTER COLUMN "quantity" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
