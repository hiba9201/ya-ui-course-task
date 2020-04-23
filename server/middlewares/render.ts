import { NextFunction as Next, Request, Response } from 'express';
import nextjs from 'next';

export default (nextApp: ReturnType<typeof nextjs>) => (req: Request, res: Response, next: Next) => {
    req.nextApp = nextApp;
    res.renderPage = async (pathname, query) => {
        await nextApp.render(req, res, pathname, query);
    };

    next();
};
