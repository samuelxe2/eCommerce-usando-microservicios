import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {

  @MessagePattern({ cmd: 'get_products' })
  getProducts() {
    return [
      { id: 1, name: 'Proteína', price: 100 },
      { id: 2, name: 'Creatina', price: 80 },
    ];
  }

}