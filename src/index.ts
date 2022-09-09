import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { AppDataSource } from './config/data-source';
import { addTicketService, ticketServiceStats } from './services/addTicket';

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app: Express = express();
    const port = process.env.PORT || 3000;

    // Helmet improve the API's security
    app.use(helmet());
    // Read all request body as string first (not considering ContentType header)
    // It will be parsed as Ticket entities later in a background task
    app.use(express.text({ type: () => true }));

    // ticket webhook
    app.post('/ticket', async (req: Request, res: Response) => {
      await addTicketService(req.body);
      res.sendStatus(200);
    });

    // display ticket parsing stats
    app.get('/ticket/stats', (req: Request, res: Response) => {
      const stats = ticketServiceStats();
      res.send(stats);
    });

    app.listen(port, () => {
      // Use console log but it would be better to use a proper logger library
      console.log(`Ticket Webhook is running at http://localhost:${port}`);
    });
  })
  .catch(error => console.log(error));
