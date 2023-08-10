import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma , Deliver as Model} from '@prisma/client';

@Injectable()
export class DeliverService {
    private readonly prisma: PrismaService;
  
    constructor(prisma: PrismaService) {
      this.prisma = prisma;
    }
    async createDelivery(data : Prisma.DeliverCreateInput) {
        return this.prisma.deliver.create({data});
    }
    async getDelivery(where : Prisma.DeliverWhereUniqueInput) {
        return this.prisma.deliver.findUnique({where});
    }
    async updateDelivery(where : Prisma.DeliverWhereUniqueInput, data : Prisma.DeliverUpdateInput){
        return this.prisma.deliver.update({where, data});
    }

}