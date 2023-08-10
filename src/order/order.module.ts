import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { ItemService } from './Item.service';
import { AddressService } from './address.service';
import { PaymentService } from './payment.service';
import { ProductModule } from 'src/product/product.module';
import { DeliverService } from './delivery.service';

@Module({
  imports : [ProductModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, ProductService, ItemService, AddressService, PaymentService, DeliverService]
})
export class OrderModule {
  
}
