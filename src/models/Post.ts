import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Comment } from "./Comment";
import { Like } from "./Like";

@Table({ tableName: 'posts', timestamps: true })
export class Post extends Model {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title!: string;

    @Column({ type: DataType.TEXT, allowNull: true })
    descriptions!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    imageUrl!: string;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Comment)
    comments!: Comment[];

    @HasMany(() => Like)
    likes!: Like[];

}