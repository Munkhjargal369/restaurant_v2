-- DropForeignKey
ALTER TABLE "Deliver" DROP CONSTRAINT "Deliver_workerId_fkey";

-- DropIndex
DROP INDEX "Deliver_workerId_key";

-- AlterTable
ALTER TABLE "Deliver" ALTER COLUMN "workerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "Worker"("id") ON DELETE SET NULL ON UPDATE CASCADE;
