import { Controller, Get, Put, Delete, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { ItemService } from './Item.service';
import { Prisma, Order as OrderModel , Item as ItemModel, Status} from '@prisma/client';
import { PaymentService } from './payment.service';
import { AddressService } from './address.service';
import { DeliverService } from './delivery.service';

@Controller('shop/:customerId')
export class OrderController {
  private readonly orderService: OrderService
  private readonly itemService: ItemService
  private readonly paymentService: PaymentService
  private readonly addressService : AddressService
  private readonly deliverService: DeliverService

  constructor(orderService: OrderService, itemService: ItemService, paymentService: PaymentService, addressService : AddressService, deliverService: DeliverService) {
    this.orderService = orderService;
    this.itemService = itemService;
    this.paymentService = paymentService;
    this.addressService = addressService;
    this.deliverService = deliverService;
  }
  //done
  @Get()
  async getAll(@Param('customerId') customerId:string): Promise<OrderModel[]> {
    try {
      return this.orderService.getAll(Number(customerId));
    } catch (error) {
      throw new Error('error');
    }
  }
  //done
  @Get('/:id') 
  async getBy(@Param('customerId') customerId: string, @Param('id') id: string): Promise<OrderModel> {
    try {
      const where : Prisma.OrderWhereUniqueInput = {
        id : Number(id),
        customerId : Number(customerId),
      }
      return this.orderService.getBy( where );
    } catch (error) {
      throw new Error('error');
    }
  }

  //done
  @Post()
  async createOrder(
    @Param('customerId') customerId: number,
    @Body() data: Prisma.OrderCreateInput,
  ): Promise<OrderModel> {
    try {
      const createData: Prisma.OrderCreateInput = {
        ...data, 
        customer: { connect: { id: Number(customerId) } }, 
      };

      return this.orderService.createOrder(createData);
    } catch (error) {
      throw new Error('error');
    }
  }

  //useless
  @Put(':itemId')
  async updateOrder(
    @Param('customerId') customerId: number,
    @Param('itemId') id: string, 
    @Body() data: Prisma.OrderUpdateInput): Promise<OrderModel> {
    try {

      return this.orderService.updateOrder({ data, where: { id: Number(id) } });
    } catch (error) {
      throw new Error(error);
    }
  }

  // useless
  @Delete(':id')
  async deleteOrder(@Param('id') id: number,  @Param('customerId') customerId: number): Promise<OrderModel> {
    try {
      return this.orderService.deleteOrder(id, customerId);
    } catch (error) {
      throw new Error('error');
    }
  }

  //done
  @Get(':orderId/item')
  async getOrderItems(
    @Param('customerId') customerId : number,
    @Param('orderId') orderId :string){
    return this.itemService.getByOrder(Number(orderId));
  }

  //done
  @Get(':orderId/item/:itemId')
  async getItems(@Param('orderId') orderId: string,
  @Param('itemId') itemId: string,){
    try{
      const where : Prisma.ItemWhereUniqueInput = {
        id: Number(itemId),
        orderId: Number(orderId),
      }
      return this.itemService.get(where);
    }catch(error){}
  }

  // done 
  @Post(':orderId/item')
  async createItem(
    @Param('orderId') orderId: number,
    @Body() Param: { productId: number }
  ): Promise<ItemModel> {
    try {
      const productId = Number(Param.productId);
      const data = { productId, orderId };
      return this.itemService.createItem(data);
    } catch (error) {
      
    }
  }
  // done 
  @Put(':orderId/item/:itemId')
  async updateItem(
    @Param('orderId') orderId: number,
    @Param('itemId') itemId: number,
    @Body() Param : {amount : number},
  ): Promise<ItemModel> {
    try {
      const amount = Param.amount;
      const where: Prisma.ItemWhereUniqueInput = {
          orderId: Number(orderId),
          id: Number(itemId),
      };

      return this.itemService.updateItem(where, amount);
    } catch (error) {
      throw new Error('Error updating item');
    }
  }

  //done 
  @Delete(':orderId/item/:itemId')
  async deleteItem(
    @Param('orderId') orderId: number,
    @Param('itemId') itemId: number,
  ): Promise<ItemModel> {
    try {
      console.log(itemId, orderId)
      const where : Prisma.ItemWhereUniqueInput = {
        id: Number(itemId),
        orderId: Number(orderId),
      }
      return this.itemService.deleteItem(where);
    } catch (error) {
      throw new Error('Error updating item');
    }
  }

  // done
  @Post(':orderId/payment/')
  async createPayment(
    @Param('orderId') orderId: number,
  ){

    return this.paymentService.createPayment({id : Number(orderId)})    ;
  }

  // done
  @Get(':orderId/payment/')
  async getPaymentByOrder(
    @Param('orderId') orderId : number,
  ){
    return this.paymentService.getPaymentByOrder({id: Number(orderId)});
  };
  //useless
  @Get(':orderId/payment/:paymentId')
  async getPayment(
    @Param('orderId') orderId: number,
    @Param('paymentId') paymentId: number,
  ){
    const where: Prisma.PaymentWhereUniqueInput = {
      id: paymentId,
      orderId: orderId,
    };

    this.paymentService.get(where);
  }
  //done
  @Post(':orderId/address')
  async creaetAddress(
    @Param('orderId') orderId: number,
    @Body() data : {district: string, commitee: string, address: string, phone_number1 : number},
  ){
    const addressData : Prisma.AddressCreateInput = {
      district: data.district,
      commitee: data.commitee,
      address: data.address,
      phone_number1: data.phone_number1,
      order: {
        connect: {
          id: Number(orderId),
        },
      },
    };
    return this.addressService.createAddress(addressData)
  }
  // done
  @Get(':orderId/address')
  async getAddress(@Param('orderId') orderId : number){
    return this.addressService.getAddress({id : Number(orderId)});
  }

    // fail   // done
    @Put(':orderId/payment/:paymentId')
    async updatePayment(
      @Param('orderId') orderId: number,
      @Param('paymentId') paymentId: number,
      @Body() data : {status : string}
    ){
      const where: Prisma.PaymentWhereUniqueInput = {
        id: paymentId,
        orderId: orderId,
      };
      let st : Status;
      if(data.status == "cancel")
        st = Status.cancel;
      else if(data.status == 'pending')
        st = Status.pending
      else if(data.status == "success")
        st = Status.success
      else  
        throw new Error('wrong status')
      console.log(st)
      
      return this.paymentService.updatePayment(where, st);
    }

  // done
  @Get(':orderId/delivery')
  async getDelivery(@Param('orderId') orderId :number){
    return this.deliverService.getDelivery({orderId : Number(orderId)});
  }

  // test
  @Put(':orderId/delivery')
  async updateDelivery(
    @Param('orderId') orderId: number,
    @Body() data: { workerId: number }, 
  ) {
    const where : Prisma.DeliverWhereUniqueInput = {
      orderId : orderId,
    }
    const upData : Prisma.DeliverUpdateInput = {
      worker: {
        connect : { id : data.workerId}
      }
    };
    return this.deliverService.updateDelivery(where , upData); 
  }
} 