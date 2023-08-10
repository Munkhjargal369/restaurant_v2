/*
  Warnings:

  - You are about to drop the column `deliverWorkerId` on the `Deliver` table. All the data in the column will be lost.
  - You are about to drop the `DeliverWorker` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workerId]` on the table `Deliver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workerId` to the `Deliver` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deliver" DROP CONSTRAINT "Deliver_deliverWorkerId_fkey";

-- DropIndex
DROP INDEX "Deliver_deliverWorkerId_key";

-- AlterTable
ALTER TABLE "Deliver" DROP COLUMN "deliverWorkerId",
ADD COLUMN     "workerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "DeliverWorker";

-- CreateTable
CREATE TABLE "Worker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "Delivering" NOT NULL DEFAULT 'no',

    CONSTRAINT "Worker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Worker_email_key" ON "Worker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Worker_phone_key" ON "Worker"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_workerId_key" ON "Deliver"("workerId");

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
