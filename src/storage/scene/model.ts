import {
    AllowNull,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    AutoIncrement, BelongsToMany, ForeignKey, Default
} from 'sequelize-typescript';
import Action from '../action/model';
import Achievement from '../achievement/model';
import AchievementScene from '../middle-tables/achievement-scene';
import ActionScene from '../middle-tables/action-scene';
import Adventure from '../adventure/model';
import Angle from '../angle/model';

@Table({
    timestamps: false,
    tableName: 'scenes'
})
class Scene extends Model<Scene> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    image: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    description: string;

    @BelongsToMany(() => Action, () => ActionScene)
    actions: Action[];

    @BelongsToMany(() => Achievement, () => AchievementScene)
    achievements: Achievement[];

    @ForeignKey(() => Adventure)
    @Column({
        field: 'adventure_id'
    })
    adventureId: number;

    @ForeignKey(() => Angle)
    @Default('left-up')
    @Column
    angle: string;
}

export default Scene;
