import { Request, Response } from 'express';
import { getAdventuresByEngTag, getAdventures } from 'storage/adventure';


export async function listAdventuresByLimitOffset(req: Request, res: Response): Promise<void> {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    const quests = await getAdventures(limit, offset);

    res.send(quests);
}

export async function listAdventuresByTag(req: Request, res: Response): Promise<void> {
    const quests = await getAdventuresByEngTag(req.params.tag);

    res.send(quests);
}

export async function getStaticPath(req: Request, res: Response): Promise<void> {
    const { staticBasePath } = req.locals;

    res.send({
        staticBasePath
    });
}
