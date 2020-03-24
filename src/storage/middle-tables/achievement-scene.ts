import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Achievement } from 'storage/achievement';
import { Scene } from 'storage/scene';

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
