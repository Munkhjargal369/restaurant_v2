import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma , Address as Model} from '@prisma/client';

@Injectable()
export class AddressService {
    private readonly prisma: PrismaService;
  
    constructor(prisma: PrismaService) {
      this.prisma = prisma;
    }
    
    async createAddress(data: Prisma.AddressCreateInput): Promise<Model>{
        try{
            return this.prisma.address.create({data});
        }catch(error){
            throw new Error("create address failed")
        }
    }

    async getAddress ( where: Prisma.AddressWhereUniqueInput) : Promise<Model>{
        try{
            return this.prisma.address.findUnique({where});
        }catch(error){
            throw new Error("get address failed")
        }
    }
}