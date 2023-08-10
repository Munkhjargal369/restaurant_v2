import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Worker as WorkerModel} from '@prisma/client';

@Injectable()
export class WorkerService {
    constructor ( private prisma: PrismaService){}


    async getAllDeliver() {
        try{
            return this.prisma.deliver.findMany();
        }catch(error){}
    }

    async updateDeliver(deliverId: number, data: Prisma.DeliverUpdateInput) {
        try {
          const existingDeliver = await this.prisma.deliver.findUnique({
            where: {
              id: Number(deliverId),
              workerId: null,
            },
          });
      
          if (!existingDeliver) {
            throw new Error("update hiih bolomjgvi");
          }
      
          return this.prisma.deliver.update({
            data,
            where: {
              id: Number(deliverId),
            },
          });
        } catch (error) {
          throw new Error(error.message);
        }
      }
      

    async getAll(): Promise<WorkerModel[]>{
        try{
            return this.prisma.worker.findMany();
        }catch(error){
            throw new Error('error');
        }
    }

    async getBy(where : Prisma.WorkerWhereUniqueInput): Promise<WorkerModel>{
        try{
            return this.prisma.worker.findUnique({where});
        }catch(error){
            throw new Error('error');
        }
    }

    async createWorker(data: Prisma.WorkerCreateInput): Promise<WorkerModel>{
        try{
            return this.prisma.worker.create({data});
        }catch(error){
            throw new Error('error');
        }
    }

    async updateWorker(params :{
        where: Prisma.WorkerWhereUniqueInput;
        data: Prisma.WorkerUpdateInput
    }){
        try{
            const {data, where} = params;
            return this.prisma.worker.update({data, where})
        }catch(error){
            throw new Error('error');
        }
    }

    async deleteWorker(where: Prisma.WorkerWhereUniqueInput): Promise<WorkerModel>{
        try{
            return this.prisma.worker.delete({where})
        }catch(error){
            throw new Error('error');
        }
    }
}

