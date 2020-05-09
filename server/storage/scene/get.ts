import { Action } from 'storage/action';
import { Achievement } from 'storage/achievement';
import { Scene } from 'storage/scene';

export async function getSceneById(id: number): Promise<Scene | null> {
    return await Scene.findByPk(id, {
        attributes: ['image', 'description', 'adventureId', 'angle'],
        include: [
            {
                model: Action,
                attributes: ['id', 'text', 'nextSceneId']
            },
            {
                model: Achievement,
                attributes: ['id', 'image', 'description']
            }
        ]
    });
}
