import { RequestHandler, Router } from 'express';
import { IControllers, IValidation } from '../app';
import asyncifyController from '../controllers/helpers';

const validate: (validation: IValidation) => RequestHandler = require('express-validation');

const { create }: IControllers = asyncifyController(require('../controllers/players'));

const router: Router = Router();

export const API_PATH: string = '/api/v1/coc-history/players';

router.post(API_PATH, validate(create.validation), create.handler);

export default router;
