import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';
import * as joi from 'joi';
import { IController, IValidation } from '../app';
import * as helpers from './helpers';

import { getPlayerInfo, IPlayerInfo, PlayerTag } from '../services/players';

export interface ControllersInterface {
  get: IController;
}

export const get: IController = {
  handler: async (request: Request, response: Response): Promise<void> => {
    const { playerTag }: { playerTag: PlayerTag } = request.params;

    const playerInfo: IPlayerInfo = await getPlayerInfo({ playerTag });

    response.send({ data: playerInfo });
  },
  validation: {
    params: joi.object().keys({
      playerTag: joi.string().required(),
    }),
  },
};
