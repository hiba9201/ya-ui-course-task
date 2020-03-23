import {
    Table,
    Model,
    PrimaryKey,
    Column,
    DataType,
    AllowNull,
    AutoIncrement, ForeignKey, BelongsToMany
} from 'sequelize-typescript';
import Scene from '../scene/model';
import Tag from '../tag/model';
import TagAdventure from '../middle-tables/tag-adventure';

@Table({
    timestamps: false,
    tableName: 'adventures'
})
class Adventure extends Model<Adventure> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Scene)
    @Column({
        field: 'start_scene'
    })
    startScene: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    description: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    image: string;

    @BelongsToMany(() => Tag, () => TagAdventure)
    tags: Tag[];
}

export default Adventure;
