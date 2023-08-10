import { Controller, Get, Post, Put, Delete, Param , Body} from '@nestjs/common';
import { ProductService } from './product.service';
import { CategoryService } from 'src/category/category.service';
import { Prisma, Product as ProductModel} from '@prisma/client';

@Controller('product')
export class ProductController {

    constructor( private readonly productService: ProductService, categoryService: CategoryService){}

    @Post(':category')
    createPorduct(@Param('category') categoryId: string,  @Body() postData:{name: string;description: string; quantity: number}): Promise<ProductModel>{
        const {name, description, quantity} = postData;
        return this.productService.createProduct({
            name,
            description,
            quantity,
            category: {
                connect : {id: Number(categoryId)},
            }
        });
    }

    @Get()
    getAll(): Promise<ProductModel[] | null>{
        return this.productService.getProduct();
    }

    @Get(':category')
    getByCategory(@Param('category') categoryId: string): Promise<ProductModel[]> {
      return this.productService.getByCategory(categoryId);
    }
    
    @Get(':id')
    getBy(@Param('id') id : string):Promise<ProductModel>{
        return this.productService.getBy({id: Number(id)});
    }

    @Put(':id')
    updateCatefory(@Param('id') id: string, @Body() data:Prisma.ProductUpdateInput): Promise<ProductModel>{
        return this.productService.updateProduct(data,  {id: Number(id)});
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string): Promise<ProductModel>{
        return this.productService.deleteProduct({id: Number(id)});
    }
}
