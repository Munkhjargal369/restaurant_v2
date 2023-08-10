import { Controller , Get, Post, Put, Delete, Param, Body, ParseIntPipe} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer as CustomerModel} from '@prisma/client';
import { createCustomerDto } from './dto/customer.dto';
import { updateCategoryDto } from 'src/category/dto/category.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService){}

    @Post()
    createCuctomer(@Body() postData: createCustomerDto):Promise<CustomerModel>{
        try{
            return this.customerService.createCustomer(postData);
        }catch(error){
            throw new Error(error);
        }
    }

    @Get()
    getAll() : Promise<CustomerModel[]>{
        return this.customerService.getAll();
    }

    @Get(":id")
    getBy(@Param('id', ParseIntPipe) id: number){
        return this.customerService.getBy(id);
    }

    @Delete(":id")
    deleteCustomer(@Param('id', ParseIntPipe) id: number): Promise<CustomerModel>{
        return this.customerService.deleteCustomer(id);
    }

    @Put(":id")
    updateCustomer(@Param('id', ParseIntPipe) id: number, @Body() data: updateCategoryDto): Promise<CustomerModel>{
        return this.customerService.updateCustomer({data , id});
    }
}
