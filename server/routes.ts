import { Application } from 'express';

import { sceneById } from 'controllers/scenes';
import { listAdventuresByTag, listAdventuresByLimitOffset } from 'controllers/adventures';
import { parse } from 'url';
import { getRuTag } from './controllers/tags';

export default (app: Application): void => {
    //pages
    app.get('/', (_req, res) => res.renderPage('/index'));

    app.get('/tags/:tag', (req, res) => res.renderPage('/tag', { tag: req.params.tag }));

    app.get('/scene/:id', (req, res) => res.renderPage('/scene', { id: req.params.id }));

    //api
    app.get('/api/scene/:id', sceneById);

    app.get('/api/quests', listAdventuresByLimitOffset);

    app.get('/api/quests/:tag', listAdventuresByTag);

    app.get('/api/rutag/:tag', getRuTag);

    //other
    app.all('*', (req, res) => {
        const handleRequest = req.nextApp.getRequestHandler();
        const parsedUrl = parse(req.url, true);

        return handleRequest(req, res, parsedUrl);
    });
};
