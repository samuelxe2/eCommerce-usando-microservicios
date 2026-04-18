import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCTS_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  getProducts() {
    return this.client.send({ cmd:'get_products'}, {});
  }
}