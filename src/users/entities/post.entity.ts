import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn({ name: 'user_id' })
    user: User;
}