import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { CategoryService } from 'src/category/category.service';
@Module({
  providers: [ProductService, PrismaService, CategoryService],
  controllers: [ProductController]
})
export class ProductModule {}
