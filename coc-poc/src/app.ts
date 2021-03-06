import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Application, NextFunction, Request, RequestHandler, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Schema } from 'joi';
import * as yaml from 'yamljs';

import clans from './routers/clans';
import players from './routers/players';

import * as cocAuth from './providers/coc-auth';

interface SwaggerUiInterface {
  serve: RequestHandler;
  setup: (spec: SwaggerSpec) => RequestHandler;
}

const swaggerUi: SwaggerUiInterface = require('swagger-ui-express');

import { IConfig } from './config';

export { Application } from 'express';

export type Handler = (request: Request, response: Response, next?: NextFunction) => Promise<void>;
export type SwaggerSpec = object;

export interface IController {
  handler: Handler;
  validation: IValidation;
}

export interface IControllers {
  [key: string]: IController;
}

export interface IValidation {
  body?: Schema;
  params?: Schema;
  query?: Schema;
}

export default async function get(config: IConfig): Promise<Application> {
  await Promise.all([cocAuth.setConfig(config)]);

  const app: Application = express();

  // health check for kubernetes
  app.get('/health', (request: Request, response: Response) => {
    response.sendStatus(HttpStatus.OK);
  });

  // hosted Swagger UI
  const swaggerSpec: SwaggerSpec = yaml.load(`${__dirname}/../swagger.yaml`);
  app.use('/api/v1/coc-poc/api-docs.json', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // endpoints
  app.use('/', [bodyParser.json(), clans, players]);

  return app;
}
