import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Controller()
export class AppController {

  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}
//aqui se crea el pedido
  @MessagePattern({ cmd: 'create_order' })
  async createOrder(data: any) {
    const order = this.orderRepo.create(data);
    return await this.orderRepo.save(order);
  }

  //aqui se obtiene el pedido por ID
  @MessagePattern({ cmd: 'get_order' })
  async getOrder(id: any) {
    return await this.orderRepo.findOneBy({ id: Number(id) });
  }

  //aqui se elimina el pedido por 
  @MessagePattern({ cmd: 'delete_order' })
  async deleteOrder(id: any) {
    await this.orderRepo.delete(Number(id));
    return { message: 'Pedido eliminado' };
  }

}