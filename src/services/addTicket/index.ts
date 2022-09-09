import Queue from 'better-queue';
import queueConfig from '../../config/queue';
import TicketParsingErrorRepository from '../../repositories/TicketParsingErrorRepository';
import TicketRepository from '../../repositories/TicketRepository';
import { parseProductCSV, parseTicketHeader } from './parser';

export async function addTicketService(ticket: string) {
  // Use a queue to persist all tickets to process and process them in background
  // If load is too high, better-queue could be replaced by RabbitMQ or Kafka
  processTicketQueue.push(ticket);
}

export function ticketServiceStats() {
  return processTicketQueue.getStats();
}

const processTicketQueue = new Queue(async (ticket: string, cb) => {
  try {
    const [header, csv] = ticket.split('\n\n');
    if (!csv) throw Error('ticket products csv missing');
    if (!header) throw Error('ticket header missing');
    const { order, vat, total } = parseTicketHeader(header);
    const products = parseProductCSV(csv);
    await TicketRepository.save({ order, vat, total, products });
    cb();
  } catch (error) {
    console.log(`Unable to add ticket: ${error}`);
    // Keep tickets that cannot be parsed in a database table
    await TicketParsingErrorRepository.save(ticket, error);
    cb(error);
  }
}, queueConfig);
