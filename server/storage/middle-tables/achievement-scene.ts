import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Achievement } from 'storage/achievement';
import { Scene } from 'storage/scene';

@Table({
    timestamps: false,
    tableName: 'achievement_scene'
})
class AchievementScene extends Model<AchievementScene> {
    @ForeignKey(() => Achievement)
    @Column(DataType.INTEGER)
    achievementId: number;

    @ForeignKey(() => Scene)
    @Column(DataType.INTEGER)
    sceneId: number;
}

export default AchievementScene;
