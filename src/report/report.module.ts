import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, PrismaService]
})
export class ReportModule {}
