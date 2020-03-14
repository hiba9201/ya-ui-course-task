import {Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: 'angles'
})
class Angle extends Model<Angle> {
    @PrimaryKey
    @Column({
        type: DataType.STRING
    })
    angle: string;
}

export default Angle;
