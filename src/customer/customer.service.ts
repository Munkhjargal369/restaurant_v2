import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Customer as CustomerModel} from '@prisma/client';

interface createCustomerParam {
    name : string,
    email : string,
    phone_number : number,
}
interface updateCustomerParam {
    name? : string,
    email? : string,
    phone_number? : number
}

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService){}

    async createCustomer(data: createCustomerParam): Promise<CustomerModel>{
        try{
            return this.prisma.customer.create({data});
        }catch(error){
            throw new Error('failed');
        }
    }

    async getAll() :Promise<CustomerModel[]>{
        try{
            return this.prisma.customer.findMany();   
        }catch(error){
            throw new Error('failed');
        }
    }

    async getBy( id: number) : Promise<CustomerModel>{
        try{
            return this.prisma.customer.findUnique({where: {id}});
        }catch(error){
            throw new Error('failed');
        }
    }

    async updateCustomer(params:{
        id : number;
        data: updateCustomerParam;
    }): Promise<CustomerModel>{
        try{
            const {id, data} = params;
            
            return this.prisma.customer.update({where: {id}, data});
        }catch(error){
            throw new Error('failed');
        }
    }

    async deleteCustomer(id:  number): Promise<CustomerModel>{
        try{
           return this.prisma.customer.delete({where: {id}});
        }catch(error){
            throw new Error('failed');
        }
    }
}
