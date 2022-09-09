import { EntityManager, Equal } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/product';
import { Ticket } from '../entities/ticket';

export type TicketDTO = {
  order: number;
  vat: number;
  total: number;
  products: ProductDTO[];
};

export type ProductDTO = {
  product: string;
  product_id: string;
  price: number;
};

async function findOrSave(manager: EntityManager, product: ProductDTO) {
  const existing = await manager.findOneBy(Product, { productId: Equal(product.product_id) });
  if (existing) {
    return existing;
  }
  return manager.save(Product, {
    price: product.price,
    product: product.product,
    productId: product.product_id,
  });
}

export default class TicketRepository {
  static async save({ order, vat, total, products: lines }: TicketDTO) {
    const { manager } = AppDataSource;
    await manager.transaction(async manager => {
      const products = [];
      for (const line of lines) {
        const product = await findOrSave(manager, line);
        products.push(product);
      }
      return manager.save(Ticket, {
        order,
        vat,
        total,
        products,
      });
    });
  }
}
