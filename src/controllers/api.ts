import { Request, Response } from 'express';
import { getAdventuresByEngTag, getAdventuresWithOffsetLimit } from 'storage/adventure';


export async function listAdventuresByLimitOffset(req: Request, res: Response): Promise<void> {
    const limit = Number(req.query.limit) !== undefined ? Number(req.query.limit) : 10;
    const offset = Number(req.query.offset) !== undefined ? Number(req.query.offset) : 0;

    const quests = await getAdventuresWithOffsetLimit(limit, offset);

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
