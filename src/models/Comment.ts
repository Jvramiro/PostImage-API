import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./User";
import { Post } from "./Post";

@Table({ tableName: 'comments', timestamps: true })
export class Comment extends Model {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER, allowNull: false })
    postId!: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    content!: string;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Post)
    post!: Post;

}