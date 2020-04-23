import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Tag } from 'storage/tag';
import { Adventure } from 'storage/adventure';

@Table({
    timestamps: false,
    tableName: 'tag_adventure'
})
class TagAdventure extends Model<TagAdventure> {
    @ForeignKey(() => Tag)
    @Column(DataType.INTEGER)
    tagId: number;

    @ForeignKey(() => Adventure)
    @Column(DataType.INTEGER)
    adventureId: number;
}

export default TagAdventure;
