import { Controller, Get, Put, Delete, Post, Body, Param , Query} from '@nestjs/common';
import { ParseEnumPipe, ParseIntPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { Status } from '@prisma/client';

@Controller('report')
//decoder
export class ReportController {
    private readonly reportService : ReportService

    constructor(reportService : ReportService){
        this.reportService = reportService;
    }
    @Get('/product/price')
    async getProductAndPrice(){
        return  this.reportService.prodcutByPrice();
    }

    @Get('payment/:status')
    async getPaymentIsPending(@Param('status',new ParseEnumPipe(Status)) status: Status) {
      return this.reportService.paymentsByStatus(status);
    }

    @Get('product/filter/:searchWord')
    async searchProduct(@Param('searchWord') searchWord : string){
        return this.reportService.searchProduct(searchWord);
    }

    @Get('product/filter')
    async filterProduct(
        @Query('min' , ParseIntPipe) min?: number, 
        @Query('max', ParseIntPipe) max?: number,
        @Query('category') category? :string,
        @Query('search') search? : string) {
        //console.log(min, max) 

      return await this.reportService.filterProduct(min, max, category, search);;
    }
}
