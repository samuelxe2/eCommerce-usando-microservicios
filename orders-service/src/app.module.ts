import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';

@Module({
  imports: [
  TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12345',
  database: 'orders_db',
  autoLoadEntities: true,
  synchronize: true,
}),

TypeOrmModule.forFeature([Order]),
],
controllers: [AppController]
})
export class AppModule {}
