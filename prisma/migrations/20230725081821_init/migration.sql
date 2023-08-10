/*
  Warnings:

  - You are about to drop the `AddressDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deliver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeliverWorker` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderedProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Deliver" DROP CONSTRAINT "Deliver_addressDetailId_fkey";

-- DropForeignKey
ALTER TABLE "Deliver" DROP CONSTRAINT "Deliver_deliverWorkerId_fkey";

-- DropForeignKey
ALTER TABLE "Deliver" DROP CONSTRAINT "Deliver_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedProduct" DROP CONSTRAINT "OrderedProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedProduct" DROP CONSTRAINT "OrderedProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropTable
DROP TABLE "AddressDetail";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Deliver";

-- DropTable
DROP TABLE "DeliverWorker";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderedProduct";

-- DropTable
DROP TABLE "Payment";
