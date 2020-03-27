import { Request, Response } from 'express';
import { ScenePageData } from './page-types';
import { getSceneById } from 'storage/scene';
import { error404 } from './errors';
import { getAdventureById } from 'storage/adventure';

export async function sceneById(req: Request, res: Response): Promise<void> {
    const { meta, staticBasePath, title } = req.locals;

    const scene = await getSceneById(Number(req.params.id));

    if (!scene) {
        return error404(req, res);
    }

    const quest = await getAdventureById(Number(scene.adventureId));

    const data: ScenePageData = {
        meta,
        staticBasePath,
        title,
        scene: scene || {},
        startSceneId: quest?.startScene || 0
    };

    res.render('scene', data);
}
