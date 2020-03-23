import {
    Model,
    Table,
    Column,
    PrimaryKey,
    DataType,
    AllowNull,
    AutoIncrement,
    BelongsToMany
} from 'sequelize-typescript';
import Scene from '../scene/model';
import AchievementScene from '../middle-tables/achievement-scene';

@Table({
    timestamps: false,
    tableName: 'achievements'
})
class Achievement extends Model<Achievement> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    description: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    image: string;

    @BelongsToMany(() => Scene, () => AchievementScene)
    scenes: Scene[];
}

export default Achievement;
