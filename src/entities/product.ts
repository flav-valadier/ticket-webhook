import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column('text')
  product!: string;
  @Column({ length: 10, unique: true })
  productId!: string;
  @Column('decimal')
  price!: number;
}
