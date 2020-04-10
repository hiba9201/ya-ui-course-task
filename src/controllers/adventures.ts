import { Request, Response } from 'express';
import { QuestsPageData, QuestsWithTagPageData } from './page-types';
import { getAdventuresByEngTag } from 'storage/adventure';
import { getTagByEngName } from 'storage/tag';
import { error404 } from './errors';
import { getAdventures } from 'storage/adventure';

export async function renderQuests(req: Request, res: Response): Promise<void> {
    const { meta, staticBasePath, title } = req.locals;

    const adventures = await getAdventures(5);

    const data: QuestsPageData = {
        meta,
        staticBasePath,
        title,
        quests: adventures
    };

    res.render('index', data);
}

export async function renderQuestsByTag(req: Request, res: Response): Promise<void> {
    const { meta, staticBasePath, title } = req.locals;
    const tagParam = req.params.tag;

    const adventures = await getAdventuresByEngTag(tagParam);
    const ruTag = (await getTagByEngName(tagParam))?.name;

    if (!ruTag) {
        return error404(req, res);
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
