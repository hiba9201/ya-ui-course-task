import { Request, Response } from 'express';
import { getAdventures, getAdventuresByEngTag } from '../storage/adventure';


export async function listAdventuresByLimitOffset(req: Request, res: Response): Promise<void> {
    const quests = await getAdventures(parseInt(req.query.limit as string), parseInt(req.query.offset as string));

    res.send(quests);
}

export async function listAdventuresByTag(req: Request, res: Response): Promise<void> {
    const quests = await getAdventuresByEngTag(req.params.tag, parseInt(req.query.limit as string),
        parseInt(req.query.offset as string));

    res.send(quests);
}
