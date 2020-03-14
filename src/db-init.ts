import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import config from 'config';

import Tag from 'models/tag';
import Achievement from "./models/achievement";
import Scene from "./models/scene";
import Action from 'models/action';
import Adventure from "./models/adventure";
import TagAdventure from "./models/tag-adventure";
import AchievementScene from "./models/achievement-scene";
import ActionScene from "./models/action-scene";
import Angle from "./models/angle";

const options: SequelizeOptions = {
    ...config.get('dbOptions'),

    dialect: 'postgres',
    models: [Tag, Achievement, Scene, Action, Adventure, TagAdventure, AchievementScene, ActionScene, Angle]
};

export default new Sequelize(options);
