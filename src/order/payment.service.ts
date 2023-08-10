import { Injectable } from '@nestjs/common';
import { Prisma , Payment as Model, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { OrderService } from './order.service';
import { ProductService } from 'src/product/product.service';
import { error } from 'console';

@Injectable()
export class PaymentService {
    private readonly prisma: PrismaService;
    private readonly orderService: OrderService;
    private readonly productService : ProductService
  
    constructor(orderService: OrderService, prisma: PrismaService, productService : ProductService) {
      this.prisma = prisma;
      this.orderService = orderService;
      this.productService = productService;
    }
    async getPaymentByOrder(where : Prisma.PaymentWhereUniqueInput){
      return this.prisma.payment.findUnique({where});
    }

    async get(where : Prisma.PaymentWhereUniqueInput){
      return this.prisma.payment.findUnique({where});
    }

    async createPayment(orderId: Prisma.OrderWhereUniqueInput): Promise<Model> {
      try {
        const order = await this.orderService.getById(orderId);
        if (!order ) {
          throw new Error('Order not found');
        }
        return this.prisma.payment.create({ data: { 
            orderId: order.id ,
            status: Status.pending,
          } });
      } catch (error) {
        throw new Error(error);
      }
    }
    async updatePayment(
      where: Prisma.PaymentWhereUniqueInput,
      st: Status,
    ): Promise<Model> {

        // order shalgah
        const order = await this.prisma.order.findUnique({
          where: { id: Number(where.orderId) },
          include: {
            items: true,
          },
        });
    
        if (!order) {
          throw new Error('Order not found');
        }
         //payment update hiih
        const w : Prisma.PaymentWhereUniqueInput = {
          id : Number(where.id),
          orderId : Number(where.orderId)
        }

        const updatedPayment = await this.prisma.payment.update({
          where : w,
          data: {
            status: st,
          },
        });

        // deliver vvsgeh
        if((await updatedPayment).status == Status.success){
          const address =await this.prisma.address.findUnique({where : {orderId: order.id}})
          if(!address)
            throw new error('address oldsongvi')
          const deliverData: Prisma.DeliverCreateInput = {
            order: {
              connect: { id: order.id }, 
            },
            address: {
              connect: { id: address.id }, 
            },
          };     
          const createdDeliver = await this.prisma.deliver.create({
            data: deliverData,
          });
          console.log(createdDeliver);

            // hudaldan awsan bvteegdehvvnvvdiin toog oorchloh
          const items = order.items;
          for (let i = 0; i < items.length; i++) {
            const product = await this.productService.getBy({ id: items[i].productId });
            if (!product)
              throw new Error('Product not found');
      
            const updatedQuantity = product.quantity - items[i].quantity;
            if (updatedQuantity < 0) {
              throw new Error('too shirheg 0ees ih bh ystoi');
            }
      
            await this.prisma.product.update({ data: { quantity: updatedQuantity }, where: { id: product.id } });
          }
        }
        return updatedPayment;
      } catch (error) {
        throw new error('address oldsongvi')
      }
    }