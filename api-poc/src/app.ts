import * as express from 'express';
import { Application, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { Config } from './config';

export { Application } from 'express';

export default async function get(config: Config): Promise<Application> {
  const app: Application = express();

  // health check for kubernetes
  app.get('/health', (request: Request, response: Response) => {
    response.sendStatus(HttpStatus.OK);
  });

  return app;
}
