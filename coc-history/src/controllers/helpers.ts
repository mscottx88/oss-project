import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { IController, IControllers } from '../app';

/**
 * Take a controller and asyncify the handlers.
 *
 * @param {Object} controller
 * The controller to asyncify
 *
 * @returns {Object}
 * The controller's handler methods are asyncified.
 */
export default function asyncifyController(controller: object): IControllers {
  return _.mapValues(
    controller,
    (value: IController): IController => {
      /* istanbul ignore else */
      if (_.isFunction(value.handler)) {
        return _.merge({}, value, {
          handler: async (
            request: Request,
            response: Response,
            next: NextFunction,
          ): Promise<void> => {
            try {
              await value.handler(request, response, next);
            } catch (error) {
              next(error);
              return;
            }
          },
        }) as IController;
      }

      /* istanbul ignore next */
      return value;
    },
  ) as IControllers;
}
