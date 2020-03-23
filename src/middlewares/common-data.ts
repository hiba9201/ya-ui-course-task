import config from 'config';
import { NextFunction as Next, Request, Response } from 'express';

export default (req: Request, _res: Response, next: Next): void => {
    req.locals = {
        meta: {
            charset: 'utf-8',
            description: 'Telltail Games'
        },
        title: 'Telltail Games',
        staticBasePath: config.get('staticBasePath'),
    };

    next();
};
