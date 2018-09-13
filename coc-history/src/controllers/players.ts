import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';
import * as joi from 'joi';
import { IController, IValidation } from '../app';
import * as helpers from './helpers';

import { create as createPlayer, IPlayer, PlayerTag } from '../services/player';

export const create: IController = {
  handler: async (request: Request, response: Response): Promise<void> => {
    const { playerTag }: { playerTag: PlayerTag } = request.params;

    const player: IPlayer = await createPlayer({ playerTag });

    response.send({ data: player });
  },
  validation: {
    body: joi.object().keys({
      playerTag: joi.string().required(),
    }),
  },
};
