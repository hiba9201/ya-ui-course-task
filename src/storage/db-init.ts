import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import config from 'config';
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

if (!config.get('dbUri')) {
    throw new URIError('No database uri was found!');
}

export default new Sequelize(config.get('dbUri'), options);