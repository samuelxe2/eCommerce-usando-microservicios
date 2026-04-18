import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller()
export class AppController {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  
  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: any) {
    const user = this.userRepo.create(data);
    return await this.userRepo.save(user);
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(id: any) {
    return await this.userRepo.findOneBy({ id: Number(id) });
  }
}