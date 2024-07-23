import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "./post.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;

    @Column({ nullable: true, default: "auth" })
    auth_strategy: string;


    @OneToOne(() => Profile)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];


}