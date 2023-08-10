import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [WorkerService, PrismaService],
  controllers: [WorkerController]
})
export class WorkerModule {}
