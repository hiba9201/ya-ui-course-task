import {
    Model,
    Table,
    PrimaryKey,
    Column,
    DataType,
    ForeignKey,
    AllowNull,
    AutoIncrement,
    BelongsToMany
} from 'sequelize-typescript';
import { Scene } from 'storage/scene';
import { ActionScene } from 'storage/middle-tables';

@Table({
    timestamps: false,
    tableName: 'actions'
})
class Action extends Model<Action> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    text: string;

    @BelongsToMany(() => Scene, () => ActionScene)
    scenes: Scene[];

    @ForeignKey(() => Scene)
    @Column({
        field: 'next_scene_id',
        type: DataType.INTEGER
    })
    nextSceneId: number;
}

export default Action;
