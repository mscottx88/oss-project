import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';
import * as joi from 'joi';
import { IController, IValidation } from '../app';
import * as helpers from './helpers';

import { ClanTag, getClanInfo, IClanInfo } from '../services/clans';

export interface ControllersInterface {
  get: IController;
}

export const get: IController = {
  handler: async (request: Request, response: Response): Promise<void> => {
    const { clanTag }: { clanTag: ClanTag } = request.params;

    const clanInfo: IClanInfo = await getClanInfo({ clanTag });

    response.send({ data: clanInfo });
  },
  validation: {
    params: joi.object().keys({
      clanTag: joi.string().required(),
    }),
  },
};
