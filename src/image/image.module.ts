import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { PrismaService } from 'src/prisma.service';
@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService]
})
export class ImageModule {}
