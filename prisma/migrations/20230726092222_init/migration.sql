/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedProduct" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "orderId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliver" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "addressDetailId" INTEGER NOT NULL,
    "deliverWorkerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deliver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressDetail" (
    "id" SERIAL NOT NULL,
    "district" TEXT NOT NULL,
    "commitee" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,

    CONSTRAINT "AddressDetail_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_orderId_key" ON "Deliver"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_addressDetailId_key" ON "Deliver"("addressDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_deliverWorkerId_key" ON "Deliver"("deliverWorkerId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliverWorker_email_key" ON "DeliverWorker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeliverWorker_phone_key" ON "DeliverWorker"("phone");

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_addressDetailId_fkey" FOREIGN KEY ("addressDetailId") REFERENCES "AddressDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_deliverWorkerId_fkey" FOREIGN KEY ("deliverWorkerId") REFERENCES "DeliverWorker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
