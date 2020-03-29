import { Adventure } from 'storage/adventure';
import { Tag } from 'storage/tag';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export async function getAllAdventures(): Promise<Adventure[]> {
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

export async function getAdventuresWithOffsetLimit(limit = 10, offset = 0): Promise<Adventure[]> {
    return await Adventure.findAll({
        where: {
            startScene: {
                [Op.not]: null
            }
        },
        order: Sequelize.col('id'),
        limit,
        offset,
        include: [
            {
                model: Tag,
                attributes: ['name', 'engName']
            }
        ],
    });
}

export async function getAdventuresByEngTag(engTag: string): Promise<Adventure[]> {
    const adventures = await getAllAdventures();

    return adventures
        .filter(quest => quest.tags
        .some(tagElem => tagElem.engName === engTag));
}

export async function getAdventureById(id: number): Promise<Adventure | null> {
    return await Adventure.findByPk(id, { attributes: ['startScene'] });
}
