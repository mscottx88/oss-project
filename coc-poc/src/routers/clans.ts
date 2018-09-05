import { RequestHandler, Router } from 'express';
import { IValidation } from '../app';
import { ControllersInterface } from '../controllers/clans';
import asyncifyController from '../controllers/helpers';

const validate: (validation: IValidation) => RequestHandler = require('express-validation');

const { get }: ControllersInterface = asyncifyController(
  require('../controllers/clans'),
) as ControllersInterface;

const router: Router = Router();

export const API_PATH: string = '/api/v1/coc-poc/clans';

router.get(`${API_PATH}/:clanTag`, validate(get.validation), get.handler);

export default router;
