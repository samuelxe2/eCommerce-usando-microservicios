import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

type Order = {
  id: number;
  userId: number;
  products: number[];
};

let orders: Order[] = [];
let idCounter = 1;

@Controller()
export class AppController {

  @MessagePattern({ cmd: 'create_order' })
  createOrder(data: any) {
    const order: Order = {
      id: idCounter++,
      ...data,
    };
    orders.push(order);
    return order;
  }

  @MessagePattern({ cmd: 'get_order' })
  getOrder(id: number) {
    return orders.find(o => o.id == id);
  }

  @MessagePattern({ cmd: 'delete_order' })
  deleteOrder(id: number) {
    orders = orders.filter(o => o.id != id);
    return { message: 'Pedido eliminado' };
  }
}