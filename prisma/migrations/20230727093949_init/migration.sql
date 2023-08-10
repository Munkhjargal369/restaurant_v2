/*
  Warnings:

  - You are about to drop the column `addressDetailId` on the `Deliver` table. All the data in the column will be lost.
  - You are about to drop the `AddressDetail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `Deliver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `Deliver` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deliver" DROP CONSTRAINT "Deliver_addressDetailId_fkey";

-- DropIndex
DROP INDEX "Deliver_addressDetailId_key";

-- AlterTable
ALTER TABLE "Deliver" DROP COLUMN "addressDetailId",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "AddressDetail";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "district" TEXT NOT NULL,
    "commitee" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number1" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_addressId_key" ON "Deliver"("addressId");

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
