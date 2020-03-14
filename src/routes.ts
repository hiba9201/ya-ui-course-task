import {Application} from 'express';

import {error404} from 'controllers/errors';
import {list, listByTag} from "./controllers/adventures";
import {sceneById} from "./controllers/scenes";

export default (app: Application): void => {
    app.get('/', list);

    app.get('/tags/:tag', listByTag);

    app.get('/scene/:id', sceneById);

    app.all('*', error404);
};
