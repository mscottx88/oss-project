import { Request, Response } from 'express';
import * as createError from 'http-errors';
import * as HttpStatus from 'http-status-codes';
import * as joi from 'joi';
import { IController, IValidation } from '../app';
import * as helpers from './helpers';

import { ICreate, IDailyInfoSnapshot } from '../services/daily-info-snapshots';
import * as snapshotServices from '../services/daily-info-snapshots';

export const create: IController = {
  handler: async (request: Request, response: Response): Promise<void> => {
    const options: ICreate = request.body;
    const dailyInfoSnapshot: IDailyInfoSnapshot = await snapshotServices.create(options);
    response.send({ data: dailyInfoSnapshot });
  },
  validation: {
    body: joi
      .object()
      .keys({
        clanId: joi.string().allow(null),
        cocResponse: joi.object().allow(null),
        playerId: joi.string().allow(null),
        snapshotDate: joi.date(),
        snapshotType: joi.string().allow(null),
      })
      .options({ allowUnknown: false, presence: 'required' }),
  },
};
