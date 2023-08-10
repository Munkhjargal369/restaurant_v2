import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
import { PrismaService } from './prisma.service';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { WorkerModule } from './worker/worker.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [PrismaService, CategoryModule, ProductModule, ImageModule, CustomerModule, OrderModule, WorkerModule, ReportModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
