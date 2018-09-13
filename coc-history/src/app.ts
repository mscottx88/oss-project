import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Application, NextFunction, Request, RequestHandler, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Schema } from 'joi';
import * as yaml from 'yamljs';

import players from './routers/players';

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

export function errorHandler(
  error: any, // tslint:disable-line:no-any
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (error.message === 'validation error') {
    response.status(HttpStatus.BAD_REQUEST).json({
      errors: error.errors || [],
      message: error.message,
    });
  } else {
    response.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: error.code || error.name,
      message: error.message,
    });
  }
}

export default async function get(config: IConfig): Promise<Application> {
  await Promise.all([]);

  const app: Application = express();

  // health check for kubernetes
  app.get('/health', (request: Request, response: Response) => {
    response.sendStatus(HttpStatus.OK);
  });

  // hosted Swagger UI
  const swaggerSpec: SwaggerSpec = yaml.load(`${__dirname}/../swagger.yaml`);
  app.use('/api/v1/coc-poc/api-docs.json', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // endpoints
  app.use('/', [bodyParser.json(), players, errorHandler]);

  return app;
}
