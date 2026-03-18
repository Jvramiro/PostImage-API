import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Post } from "./Post";

@Table({ tableName: 'likes', timestamps: true })
export class Like extends Model {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER, allowNull: false })
    postId!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Post)
    post!: Post;

}