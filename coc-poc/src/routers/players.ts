import { RequestHandler, Router } from 'express';
import { IValidation } from '../app';
import asyncifyController from '../controllers/helpers';
import { ControllersInterface } from '../controllers/players';

const validate: (validation: IValidation) => RequestHandler = require('express-validation');

const { get }: ControllersInterface = asyncifyController(
  require('../controllers/players'),
) as ControllersInterface;

const router: Router = Router();

export const API_PATH: string = '/api/v1/coc-poc/players';

router.get(`${API_PATH}/:playerTag`, validate(get.validation), get.handler);

export default router;
