import {
    AllowNull,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    AutoIncrement, BelongsToMany, ForeignKey, Default
} from 'sequelize-typescript';
import { Action } from 'storage/action';
import { Achievement } from 'storage/achievement';
import { AchievementScene, ActionScene } from 'storage/middle-tables';
import { Adventure } from 'storage/adventure';

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

    @Default('left-up')
    @Column(DataType.ENUM('left-up', 'left-down', 'right-up', 'right-down'))
    angle: 'left-up' | 'left-down' | 'right-up' | 'right-down';
}

export default Scene;
