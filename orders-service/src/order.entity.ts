import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column('simple-array')
  products!: number[];
}