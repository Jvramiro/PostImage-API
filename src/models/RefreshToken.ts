import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./User";


@Table({ tableName: 'refresh_tokens', timestamps: true })
export class RefreshToken extends Model {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    token!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    expiresAT!: Date;

    @BelongsTo(() => User)
    user!: User;

}