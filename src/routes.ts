import { Application } from 'express';

import { error404 } from 'controllers/errors';
import { renderQuests, renderQuestsByTag } from 'controllers/adventures';
import { sceneById } from 'controllers/scenes';
import { listAdventuresByTag, listAdventuresByLimitOffset, getStaticPath } from 'controllers/api';

export default (app: Application): void => {
    app.get('/', renderQuests);

    app.get('/tags/:tag', renderQuestsByTag);

    app.get('/scene/:id', sceneById);

    app.get('/api/quests', listAdventuresByLimitOffset);

    app.get('/api/quests/:tag', listAdventuresByTag);

    app.get('/api/static', getStaticPath);

    app.all('*', error404);
};
