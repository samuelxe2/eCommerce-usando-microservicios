import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
    ]),
  ],

  controllers: [UsersController, ProductsController, OrdersController],
  
})
export class AppModule {}
