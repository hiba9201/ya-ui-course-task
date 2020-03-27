import {
    Table,
    Model,
    PrimaryKey,
    Column,
    DataType,
    AllowNull,
    AutoIncrement, ForeignKey, BelongsToMany
} from 'sequelize-typescript';
import { Scene } from 'storage/scene';
import { Tag } from 'storage/tag';
import { TagAdventure } from 'storage/middle-tables';

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
