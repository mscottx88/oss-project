import { RequestHandler, Router } from 'express';
import { IControllers, IValidation } from '../app';
import asyncifyController from '../controllers/helpers';

const validate: (validation: IValidation) => RequestHandler = require('express-validation');

const { get }: IControllers = asyncifyController(require('../controllers/players'));

const router: Router = Router();

export const API_PATH: string = '/api/v1/coc-poc/players';

router.get(`${API_PATH}/:playerTag`, validate(get.validation), get.handler);

export default router;
