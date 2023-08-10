import { Injectable } from '@nestjs/common';
import { Customer, Order, Payment, Prisma, Status } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class ReportService {
    private readonly prisma: PrismaService;
  
    constructor( prisma: PrismaService) {
      this.prisma = prisma;
    }

    async prodcutByPrice() {
        return this.prisma.product.findMany({
            orderBy : {price : 'desc'}
        })
    }

    async paymentsByStatus(st: Status) {
        try {
          const orders: Order[] = await this.prisma.order.findMany({
            where: {
              payment: {
                status: st,
              },
            },
          });
      
          if (!orders || orders.length === 0) {
            throw new Error('zahialga odoogoor alga');
          }
      
          const orderIds: number[] = orders.map((order) => order.id);
      
          const deliver = await this.prisma.deliver.findMany({
            where: { orderId: { in: orderIds } },
          });
      
          return deliver;
        } catch (error) {
          throw new Error(error.message);
        }
      }
      

    async searchProduct(key : string){
        return this.prisma.product.findMany({
            where: {
              name: {
                contains: key,
                mode: 'insensitive', // Perform a case-insensitive search
              },
            },
          });
    }
    async filterProduct(min? : number, max? : number, category? : string, search? : string){
        console.log(min, max)
        return this.prisma.product.findMany({
            where: {
                price : {
                    gt : Number(min),       // greather than
                    lt : Number(max)           // lower than
                }
            }
        })
    }
}
