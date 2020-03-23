import Action from '../action/model';
import Achievement from '../achievement/model';
import { Scene } from '.';

export async function getSceneById(id: number): Promise<Scene | null> {
    return await Scene.findByPk(id, {
        attributes: ['image', 'description', 'adventureId', 'angle'],
        include: [
            {
                model: Action,
                attributes: ['text', 'nextSceneId']
            },
            {
                model: Achievement,
                attributes: ['image', 'description']
            }
        ]
    });
}
