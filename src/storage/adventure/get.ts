import { Adventure } from 'storage/adventure';
import { Tag } from 'storage/tag';
import { Op } from 'sequelize';

export async function getAllAdventures(): Promise<object> {
    return await Adventure.findAll({
        where: {
            startScene: {
                [Op.not]: null
            }
        },
        include: [
            {
                model: Tag,
                attributes: ['name', 'engName']
            }
        ],
    });
}

export async function getAdventuresByTag(engTag: string): Promise<object> {
    const adventures = await Adventure.findAll({
        include: [
            {
                model: Tag,
                attributes: ['name', 'engName']
            }
        ],
        where: {
            startScene: {
                [Op.ne]: null
            }
        },
    });

    return adventures
        .filter(quest => quest.tags
        .some(tagElem => tagElem.engName === engTag));
}

export async function getAdventureById(id: number): Promise<Adventure | null> {
    return await Adventure.findByPk(id, { attributes: ['startScene'] });
}
