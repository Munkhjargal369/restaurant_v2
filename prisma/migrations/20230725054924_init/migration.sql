-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'succes');

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "describtion" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cumtomer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cumtomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliver" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "addressDetailId" INTEGER NOT NULL,
    "deliverWorkerId" INTEGER NOT NULL,

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
CREATE TABLE "DeliveryWorker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,

    CONSTRAINT "DeliveryWorker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Cumtomer_email_key" ON "Cumtomer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_orderId_key" ON "Deliver"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_addressDetailId_key" ON "Deliver"("addressDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "Deliver_deliverWorkerId_key" ON "Deliver"("deliverWorkerId");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryWorker_email_key" ON "DeliveryWorker"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryWorker_phone_key" ON "DeliveryWorker"("phone");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_addressDetailId_fkey" FOREIGN KEY ("addressDetailId") REFERENCES "AddressDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliver" ADD CONSTRAINT "Deliver_deliverWorkerId_fkey" FOREIGN KEY ("deliverWorkerId") REFERENCES "DeliveryWorker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
