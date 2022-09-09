import { AppDataSource } from '../config/data-source';
import { TicketParsingError } from '../entities/ticketParsingError';

export default class TicketParsingErrorRepository {
  static async save(ticket: string, error: unknown) {
    const { manager } = AppDataSource;
    const ticketError = new TicketParsingError();
    ticketError.ticket = ticket;
    if (error instanceof Error) {
      ticketError.error = error.message;
    } else {
      ticketError.error = JSON.stringify(error);
    }
    return manager.save(ticketError);
  }
}
