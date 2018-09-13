import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';
import * as joi from 'joi';
import { IController, IValidation } from '../app';
import * as helpers from './helpers';

import { IPlayer, PlayerTag } from '../services/players';
import * as playerServices from '../services/players';

export const create: IController = {
  handler: async (request: Request, response: Response): Promise<void> => {
    const { playerTag }: { playerTag: PlayerTag } = request.body;

    const player: IPlayer = await playerServices.create({ playerTag });

    response.send({ data: player });
  },
  validation: {
    body: joi.object().keys({
      playerTag: joi.string().required(),
    }),
  },
};

export const getByPlayerTag: IController = {
  handler: async (request: Request, response: Response): Promise<void> => {
    const { playerTag }: { playerTag: PlayerTag } = request.params;

    const player: IPlayer = await playerServices.getByPlayerTag({ playerTag });

    if (!player) {
      throw new createError.NotFound(`Player with tag '${playerTag}' not found.`);
    }

    response.send({ data: player });
  },
  validation: {
    params: joi.object().keys({
      playerTag: joi.string().required(),
    }),
  },
};
