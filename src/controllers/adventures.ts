import { Request, Response } from 'express';
import { QuestsPageData, QuestsWithTagPageData } from './page-types';
import { getAdventuresByTag, getAllAdventures } from 'storage/adventure';
import { getTagByEngName } from 'storage/tag';
import { error404 } from './errors';

export async function list(req: Request, res: Response): Promise<void> {
    const { meta, staticBasePath, title } = req.locals;

    const adventures = await getAllAdventures();

    const data: QuestsPageData = {
        meta,
        staticBasePath,
        title,
        quests: adventures
    };

    res.render('index', data);
}

export async function listByTag(req: Request, res: Response): Promise<void> {
    const { meta, staticBasePath, title } = req.locals;
    const tagParam = req.params.tag;

    const adventures = await getAdventuresByTag(tagParam);
    const ruTag = (await getTagByEngName(tagParam))?.name;

    if (!ruTag) {
        error404(req, res);

        return;
    }

    const data: QuestsWithTagPageData = {
        meta,
        staticBasePath,
        title,
        tag: ruTag,
        quests: adventures
    };

    res.render('tag', data);
}
