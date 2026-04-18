import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {

  @MessagePattern({ cmd: 'create_user' })
  createUser(data: any) {
    return {
      message: 'Usuario creado correctamente',
      data,
    };
  }
  @MessagePattern({ cmd: 'get_user' })
  getUser(id: string) {
    return {
      id,
      name: 'Usuario demo',
    };
  }
}