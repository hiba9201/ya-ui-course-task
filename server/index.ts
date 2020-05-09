import path from 'path';

import express, { Request, Response, NextFunction as Next } from 'express';
import config from 'config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import nextjs from 'next';

import routes from 'routes';
import render from 'middlewares/render';
import { initDatabase } from 'storage/db-init';

import 'isomorphic-fetch';

const app = express();

const nextApp = nextjs({ dev: process.env.NODE_ENV !== 'production' });

const publicDir = path.join(__dirname, 'public');

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use(bodyParser.json());

app.use(render(nextApp));

routes(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);
    res.sendStatus(500);
});

(async (): Promise<void> => {
    await initDatabase();
    await nextApp.prepare();

    const port = config.get('port');

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
})();

