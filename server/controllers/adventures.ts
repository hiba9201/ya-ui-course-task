import { Request, Response } from 'express';
import { getAdventures, getAdventuresByEngTag } from '../storage/adventure';


export async function listAdventuresByLimitOffset(req: Request, res: Response): Promise<void> {
    const quests = await getAdventures(req.query.limit, req.query.offset);

    res.send(quests);
}

export async function listAdventuresByTag(req: Request, res: Response): Promise<void> {
    const quests = await getAdventuresByEngTag(req.params.tag, req.query.limit, req.query.offset);

    res.send(quests);
}
