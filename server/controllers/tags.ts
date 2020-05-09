import { Request, Response } from 'express';
import { getTagByEngName } from '../storage/tag';
import { error404 } from './errors';

export async function getRuTag(req: Request, res: Response): Promise<void> {
    const tag = await getTagByEngName(req.params.tag);

    if (!tag) {
        return error404(req, res);
    }

    res.send({ ruTag: tag.name });
}
