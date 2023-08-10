import { Injectable } from '@nestjs/common';
import { Prisma, Item as ItemModel, Product as ProductModel , Order as OrderModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { OrderService } from './order.service';
import { error } from 'console';

@Injectable()
export class ItemService {
    private readonly productService: ProductService;
    private readonly prisma: PrismaService;
    private readonly orderService: OrderService;
  
    constructor(productService: ProductService, prisma: PrismaService) {
      this.productService = productService;
      this.prisma = prisma;
      this.orderService = this.orderService;
    }

    async getByOrder(orderId: number): Promise<ItemModel[]> {
      return this.prisma.item.findMany({
        where: {
          orderId: orderId,
        },
      });
    }
    async get(where: Prisma.ItemWhereUniqueInput): Promise<ItemModel>{
      try{
        return this.prisma.item.findUnique({where});
      }catch(error){

      }
    }

    async deleteItem(where: Prisma.ItemWhereUniqueInput) : Promise<ItemModel> {
      try{
        const del = await this.prisma.item.delete({where});
        try{
          await this.updateOrder({id :Number(where.orderId)});
        }catch(error){
          throw new error('updateOrder error', error);
        }
        
        return del;
    }catch(error){
      throw new Error('Error creating item');
    }
    }

    async updateItem(where: Prisma.ItemWhereUniqueInput, update: number): Promise<ItemModel> {
      try {
        const item  : ItemModel = await this.get(where);
        if (!item) {
          throw new Error('Item not found');
        }
    
        const pWhere: Prisma.ProductWhereUniqueInput = {
          id: item.productId,
        };
        const product: ProductModel = await this.productService.getBy(pWhere);
       
        if (!product) {
          throw new Error('Product not found');
        }

        if (update > product.quantity) {
          throw new Error('Zahialgiin too het ih baina');
        } else if (update < 0) {
          throw new Error('Zahialgiin too eyreg bh ystoi');
        }

        const updatedItem = await this.prisma.item.update({
          where,
          data: { quantity:  Number(update), amount: item.price * update },
        });

        try{
           await this.updateOrder({ id: Number(where.orderId) });
        }catch(error){
          throw new Error(error);
        }
    
        return updatedItem;
      } catch (error) {
        throw new Error(error);
      }
    }
        
    async createItem(params: { productId: number; orderId: number }): Promise<ItemModel> {
      const { productId, orderId } = params;
      console.log(productId);

      const product : ProductModel= await  this.prisma.product.findUnique({where: {id : productId}});
      if(!product)
        throw new error("product oldsongvi")

      if(product.quantity == 0 || !product){
        throw new Error('biteegdehvvn oldsongvi');
      }
      const order : OrderModel  = await  this.prisma.order.findUnique({where : {id : Number(orderId)}});
      if(!order){
        throw new Error('order oldsongvi');
      }

        const data = {
          productId: product.id,
          price: product.price,
          name: product.name, 
          amount: product.price ,
          quantity: 1,
          orderId : order.id,
        };
        try{
          const pr = await this.prisma.item.create({ data });
          this.updateOrder({id : Number(orderId)});
  
          return pr;
        }catch(error){
          throw new Error('ymartai ch neg aldaa hha');
        }
    }
    async updateOrder(where: Prisma.OrderWhereUniqueInput) {
      try {
        console.log(where);
        const order = await this.prisma.order.findUnique({where});
        if (!order)
          throw new Error('Order not found (updateOrder)');
        console.log(order);
        
        const items: ItemModel[] = await this.getByOrder(order.id);
        
        let sum = 0;
        for (let i = 0; i < items.length; i++) {
          sum += items[i].amount;
        }
        
        const data: Prisma.OrderUpdateInput = {
          total_price: sum,
        };
    
        return this.prisma.order.update({ where, data });
      } catch (error) {
        throw error;
      }
    }
}