import { Controller ,Get, Put, Delete, Post, Body, Param} from '@nestjs/common';
import { WorkerService} from './worker.service';
import { Prisma, Worker as WorkerModel } from '@prisma/client';

@Controller('worker')
export class WorkerController {
    constructor(private readonly workerService: WorkerService){}


    @Get('deliver') getAllDeliver() {
        try{
            return this.workerService.getAllDeliver();
        }catch(error){}
    }

    @Post('deliver/:deliverId') updateDeliver(
        @Param('deliverId') deliverId : number,
        @Body() data : Prisma.DeliverUpdateInput
    ) {
        try{
            return this.workerService.updateDeliver(deliverId, data);
        }catch(error){}
    }
    @Get()
    async getAll() : Promise<WorkerModel[]>{
        try{
            return this.workerService.getAll();
        }catch(error){
            throw new Error('error');
        }
    }

    @Post()
    async createWorker(@Body() data: Prisma.WorkerCreateInput): Promise<WorkerModel>{
        try{
            return this.workerService.createWorker(data);
        }catch(error){
            throw new Error('error');
        }
    }

    @Get(':id')
    async getBy(@Param('id') id: string):Promise<WorkerModel>{
        try{
            return this.workerService.getBy({id: Number(id)});
        }catch(error){
            throw new Error('error');
        }
    }

    @Put(':id')
    async updateWorker(@Param('id') id: string, @Body() data:Prisma.WorkerUpdateInput): Promise<WorkerModel>{
        try{
            return this.workerService.updateWorker({ where: {id: Number(id)}, data});
        }catch(error){
            throw new Error('error');
        }
    }

    @Delete(':id')
    async deleteWorker(@Param('id') id: string): Promise<WorkerModel>{
        try{
            return this.workerService.deleteWorker({id: Number(id)});
        }catch(error){
            throw new Error('error');
        }
    }

}
