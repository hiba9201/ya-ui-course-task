import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Action from '../action/model';
import Scene from '../scene/model';

@Table({
    timestamps: false,
    tableName: 'action_scene'
})
class ActionScene extends Model<ActionScene> {
    @ForeignKey(() => Action)
    @Column({
        field: 'action_id'
    })
    actionId: number;

    @ForeignKey(() => Scene)
    @Column({
        field: 'scene_id'
    })
    sceneId: number;
}

export default ActionScene;
