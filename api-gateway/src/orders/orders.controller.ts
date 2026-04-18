import { Controller, Post, Body, Get, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDERS_SERVICE') private client: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() body: any) {
    return this.client.send({ cmd: 'create_order' }, body);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.client.send({ cmd: 'get_order' }, id);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete_order' }, id);
  }
}