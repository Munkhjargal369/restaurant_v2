import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Product as ProductModel} from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}
    
    async getByCategory(categoryId: string): Promise<ProductModel[]> {
      const products = await this.prisma.product.findMany({
        where: {
          category: { id: Number(categoryId) },
        },
      });
      return products;
    }
      
    async createProduct( data: Prisma.ProductCreateInput) : Promise<ProductModel>{
        try{
            return this.prisma.product.create({data});
        }
        catch(error){
            throw new Error("failed");
        }
    }

    async getProduct() : Promise<ProductModel[] | null> {
        try{
            return this.prisma.product.findMany();
        }
        catch(error){
            throw new Error("falied");
        }
    }

    async getBy(where : Prisma.ProductWhereUniqueInput): Promise<ProductModel>{
        try{
            return this.prisma.product.findUnique({where});
        }catch(error){
            throw new Error('failed');
        }
    }

    async updateProduct(
        data: Prisma.ProductUpdateInput,
        where: Prisma.ProductWhereUniqueInput,
        ): Promise<ProductModel>{
        try{
            return this.prisma.product.update({where, data});
        }catch(error){
            throw new Error("failed");
        }

    }
    async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<ProductModel>{
        try{
            return this.prisma.product.delete({where});
        }
        catch(error){
            throw new Error("failed");
        }       
    }
}
