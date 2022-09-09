import Papa from 'papaparse';
import { ProductDTO } from '../../repositories/TicketRepository';

const TICKET_HEADER_REGEX = /Order: (?<order>\d*)\nVAT: (?<vat>\d*\.\d*)\nTotal: (?<total>\d*\.\d*)/m;

export function parseTicketHeader(header: string) {
  const match = header.match(TICKET_HEADER_REGEX);
  const { order, vat, total } = match?.groups || {};
  if (!order || !vat || !total) throw Error('bad ticket header');
  return {
    order: parseInt(order, 10),
    vat: parseFloat(vat),
    total: parseFloat(total),
  };
}

export function parseProductCSV(csv: string) {
  const result = Papa.parse<ProductDTO>(csv, {
    header: true,
    dynamicTyping: true,
  });
  if (result.errors.length) throw Error('bad ticket products csv');
  return result.data;
}
