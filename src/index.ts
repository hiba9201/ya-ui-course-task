import path from 'path';

import express, { Request, Response, NextFunction as Next } from 'express';
import config from 'config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import hbs from 'hbs';

import routes from 'routes';
import commonData from 'middlewares/common-data';
import { initDatabase } from 'storage/db-init';

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');

app.set('views', viewsDir);

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({
    extended: true
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: Next) => {

    console.error(err.stack);
    res.sendStatus(500);

});

app.use(commonData);

(async (): Promise<void> => {
    await initDatabase();

    hbs.registerPartials(partialsDir, () => {
        routes(app);

        const port = config.get('port');

        app.listen(port, () => {
            console.info(`Server started on ${port}`);
            console.info(`Open http://localhost:${port}/`);
        });
    });
})();

