import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Order as OrderModel , Item as ItemModel, Product as ProductModel} from '@prisma/client';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
    private readonly productService: ProductService;
    private readonly prisma: PrismaService;
  
    constructor(productService: ProductService, prisma: PrismaService) {
      this.productService = productService;
      this.prisma = prisma;
    }

    async getAll(customerId : number) : Promise<OrderModel[]>{
        try{
            return this.prisma.order.findMany({ where: { customerId: customerId } });
        }catch(error){
            throw new Error('error');
        }
    }
    
    async getById(orderId: Prisma.OrderWhereUniqueInput): Promise<OrderModel>{
        return this.prisma.order.findUnique({where: orderId});
    }

    async getBy(where : Prisma.OrderWhereUniqueInput): Promise<OrderModel>{
        try{
            return this.prisma.order.findUnique({where } );
        }catch(error){
            throw new Error('error');
        }
    }

    async createOrder(data: Prisma.OrderCreateInput): Promise<OrderModel>{
        try{
            const customer = await this.prisma.customer.findUnique({
                where : {id : Number(data.customer.connect.id)},
            })

            if(!customer){
                throw new Error('customer oldsongvi');
            }
            return this.prisma.order.create({
                data: {
                  total_price: 0,
 
                  customer: {
                    connect: { id: Number(data.customer.connect.id) },
                  },
                },
              });
        }catch(error){
            throw new Error(error);
        }
    }
    
    async updateOrder(params: {
        data: Prisma.OrderUpdateInput; where: Prisma.OrderWhereUniqueInput}) : Promise<OrderModel>{
        try{
            const {data, where} = params;
            return this.prisma.order.update({data, where});
        }catch(error){
            throw new Error('error');
        }
    }
    async deleteOrder(orderId:number, customerId:number): Promise<OrderModel>{
        try{
            return this.prisma.order.delete({where: {
                id: orderId,
                customerId: customerId,
            }});
        }catch(error){
            throw new Error('error');
        }
    }
    async createItem(productId: number, orderId: number): Promise<ItemModel> {
        const product : ProductModel = await this.productService.getBy({ id: Number(productId) });
        const order = await this.getById({ id: Number(orderId) });
      
        const data: Prisma.ItemCreateInput = {
            product: {
              connect: { id: product.id },
            },
            price: product.price,
            name: product.name,
            amount: product.price,
            quantity: 1,
            order: {
              connect: { id: order.id },
            },
          };
      
        return   this.prisma.item.create({ data });
      }
    
}
