import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    AllowNull,
    BelongsToMany,
    Unique
} from 'sequelize-typescript';
import { Adventure } from 'storage/adventure';
import { TagAdventure } from 'storage/middle-tables';

@Table({
    timestamps: false,
    tableName: 'tags'
})
class Tag extends Model<Tag> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING,
        field: 'eng_name'
    })
    engName: string;

    @BelongsToMany(() => Adventure, () => TagAdventure)
    adventures: Adventure[];
}

export default Tag;
