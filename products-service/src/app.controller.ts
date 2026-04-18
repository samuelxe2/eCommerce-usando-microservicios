import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Controller()
export class AppController {
  constructor(
  @InjectRepository(Product)
  private productRepo: Repository<Product>,
) {}

@MessagePattern({ cmd:'get_products'})
async getProducts() {
  return await this.productRepo.find();
}

}