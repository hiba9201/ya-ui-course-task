import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import config from 'config';
import { Achievement } from 'storage/achievement';
import { Scene } from 'storage/scene';
import { Action } from 'storage/action';
import { Adventure } from 'storage/adventure';
import { TagAdventure, AchievementScene, ActionScene } from 'storage/middle-tables';
import { Tag } from 'storage/tag';


export async function initDatabase(): Promise<void> {
    const options: SequelizeOptions = {
        models: [Tag, Achievement, Scene, Action, Adventure, TagAdventure, AchievementScene, ActionScene]
    };

    if (!config.get('dbUri')) {
        throw new URIError('No database uri was found!');
    }

    const db = new Sequelize(config.get('dbUri'), options);

    await db.sync({ force: false });
}
