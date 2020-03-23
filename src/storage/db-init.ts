import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { Achievement } from 'storage/achievement';
import { Scene } from 'storage/scene';
import { Action } from 'storage/action';
import { Adventure } from 'storage/adventure';
import { TagAdventure, AchievementScene, ActionScene } from 'storage/middle-tables';
import { Angle } from 'storage/angle';
import { Tag } from 'storage/tag';

const options: SequelizeOptions = {
    models: [Tag, Achievement, Scene, Action, Adventure, TagAdventure, AchievementScene, ActionScene, Angle]
};

if (!process.env.DB_URI) {
    throw new URIError('No database uri was found!')
}

export default new Sequelize(process.env.DB_URI, options);
