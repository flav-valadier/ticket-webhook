import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Product } from './product';

@Entity()
export class Ticket {
  @PrimaryColumn('integer')
  order!: number;
  @Column('decimal')
  vat!: number;
  @Column('decimal')
  total!: number;
  // Use a many to many relation to store only once each product that belongs to several tickets
  @ManyToMany(() => Product)
  @JoinTable()
  products!: Product[];
}
