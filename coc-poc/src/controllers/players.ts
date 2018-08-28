import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';
import * as joi from 'joi';
import { IController, IValidation } from '../app';
import * as helpers from './helpers';

export interface ControllersInterface {
  get: IController;
}

export const get: IController = {
  handler: async (request: Request, response: Response): Promise<void> => {
    response.send({ data: {} });
  },
  validation: {},
};
