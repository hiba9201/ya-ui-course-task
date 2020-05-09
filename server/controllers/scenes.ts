import { Request, Response } from 'express';
import { getSceneById } from '../storage/scene';
import { error404 } from './errors';
import { getAdventureStartSceneById } from '../storage/adventure';

export async function sceneById(req: Request, res: Response): Promise<void> {
    const scene = await getSceneById(Number(req.params.id));

    if (!scene) {
        return error404(req, res);
    }

    const startScene = await getAdventureStartSceneById(Number(scene.adventureId));

    const data = {
        scene: scene,
        startSceneId: startScene
    };

    res.send(data);
}
