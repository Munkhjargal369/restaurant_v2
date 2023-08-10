import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Category as CategoryModel } from '@prisma/client';

interface createCategoryParam {
    name: string;
}

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}

    async getAll(): Promise<CategoryModel[]>{
        return this.prisma.category.findMany();
    }

    async getBy(id : number): Promise<CategoryModel> {
        try{
            return await this.prisma.category.findUnique({where : {id}});
        }
        catch(error){
            throw new NotFoundException();
        }
      }

    async createCategory(data: createCategoryParam): Promise<CategoryModel>{
        return this.prisma.category.create({data})
    };

    async updateCategory(params: {
        data: createCategoryParam;
        id: number
    }):Promise<CategoryModel>{
        const {data, id} = params;
        return this.prisma.category.update({
            data,
            where : {id},
        });
    }

    async deleteCategory(id : number): Promise<CategoryModel>{
        return this.prisma.category.delete({
            where : {id},
        })
    }
}
