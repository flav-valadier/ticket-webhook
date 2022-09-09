import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Ticket } from '../entities/ticket';
import { Product } from '../entities/product';
import { TicketParsingError } from '../entities/ticketParsingError';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOSTNAME || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_DATABASE || 'postgres',
  synchronize: true,
  logging: false,
  entities: [TicketParsingError, Ticket, Product],
  migrations: [],
  subscribers: [],
});
