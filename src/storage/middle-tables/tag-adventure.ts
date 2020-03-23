import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Tag from '../tag/model';
import Adventure from '../adventure/model';

@Table({
    timestamps: false,
    tableName: 'tag_adventure'
})
class TagAdventure extends Model<TagAdventure> {
    @ForeignKey(() => Tag)
    @Column
    tagId: number;

    @ForeignKey(() => Adventure)
    @Column
    adventureId: number;
}

export default TagAdventure;
