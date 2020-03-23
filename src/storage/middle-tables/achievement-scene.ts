import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Achievement from '../achievement/model';
import Scene from '../scene/model';

@Table({
    timestamps: false,
    tableName: 'achievement_scene'
})
class AchievementScene extends Model<AchievementScene> {
    @ForeignKey(() => Achievement)
    @Column
    achievementId: number;

    @ForeignKey(() => Scene)
    @Column
    sceneId: number;
}

export default AchievementScene;
