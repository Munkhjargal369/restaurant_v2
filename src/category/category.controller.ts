import { Controller , Get, Post, Put, Delete, Param, Body, ParseIntPipe, NotFoundException} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category  as CategoryModel} from '@prisma/client';
import { createCategoryDto, updateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    getAll() :Promise<CategoryModel[]> {
        return this.categoryService.getAll();
    }

    @Get(':id')
    async getBy(@Param('id', ParseIntPipe) id: number): Promise<CategoryModel> {
      try {
        return await this.categoryService.getBy(id);
      } catch (error) {
        throw new NotFoundException();
      }
    }

    @Post()
    createCategory(@Body() data:createCategoryDto): Promise<CategoryModel>{
        return this.categoryService.createCategory(data);
    };

    @Put(':id')
    updateCatefory(
      @Param('id', ParseIntPipe) id: number,
      @Body() data:updateCategoryDto): Promise<CategoryModel>{
        return this.categoryService.updateCategory({data, id });
    }

    @Delete(':id')
    deleteCategory(@Param('id', ParseIntPipe) id: number): Promise<CategoryModel>{
        return this.categoryService.deleteCategory(id);
    }
}
