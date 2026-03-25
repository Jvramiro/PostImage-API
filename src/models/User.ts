import { BeforeCreate, BeforeUpdate, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import bcrypt from 'bcryptjs';
import { UserRole } from "../enums/UserRole";
import { Post } from "./Post";
import { Comment } from "./Comment";
import { RefreshToken } from "./RefreshToken";

@Table({ tableName: 'users', timestamps: true })
export class User extends Model{

    @Column({ type: DataType.STRING, allowNull: false })
    username!: string

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    password!: string;

    @Column({ type: DataType.ENUM(...Object.values(UserRole)), allowNull: false, defaultValue: UserRole.USER})
    role!: UserRole;

    @HasMany(() => Post)
    posts!: Post[];

    @HasMany(() => Comment)
    comments!: Comment[];

    @HasMany(() => RefreshToken)
    refreshTokens!: RefreshToken[];

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(instance: User) {
        if (instance.changed('password')){
            instance.password = await bcrypt.hash(instance.password, 10);
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

    toJSON() {
        const values = { ...this.get() } as any;
        delete values.password;
        return values;
    }

}