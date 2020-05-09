import { Adventure } from 'storage/adventure';
import { Tag } from 'storage/tag';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';


export async function getAdventures(limit?: number, offset?: number): Promise<Adventure[]> {
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
                attributes: ['id', 'name', 'engName']
            }
        ],
    });
}

export async function getAdventuresByEngTag(engTag: string, limit?: number, offset?: number): Promise<Adventure[]> {
    const adventureIds = (await Adventure.findAll({
        attributes: ['id'],
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
                attributes: ['engName'],
                where: {
                    engName: engTag
                }
            }
        ]
    })).map((adventure) => adventure.id);

    return await Adventure.findAll({
        where: {
            id: {
                [Op.in]: adventureIds
            }
        },
        include: [
            {
                model: Tag,
                attributes: ['id', 'name', 'engName']
            }
        ]
    });
}

export async function getAdventureStartSceneById(id: number): Promise<number> {
    const adventure = await Adventure.findByPk(id, { attributes: ['startScene'] });

    return adventure?.startScene || 0;
}
