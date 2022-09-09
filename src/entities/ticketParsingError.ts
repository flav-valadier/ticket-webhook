import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketParsingError {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column('text')
  ticket!: string;
  @Column({ type: 'text', nullable: true })
  error!: string;
}
