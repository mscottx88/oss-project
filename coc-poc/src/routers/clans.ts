import { RequestHandler, Router } from 'express';
import { IControllers, IValidation } from '../app';
import asyncifyController from '../controllers/helpers';

const validate: (validation: IValidation) => RequestHandler = require('express-validation');

const { get, getMembers }: IControllers = asyncifyController(require('../controllers/clans'));

const router: Router = Router();

export const API_PATH: string = '/api/v1/coc-poc/clans';

router.get(`${API_PATH}/:clanTag/members`, validate(getMembers.validation), getMembers.handler);
router.get(`${API_PATH}/:clanTag`, validate(get.validation), get.handler);

export default router;
