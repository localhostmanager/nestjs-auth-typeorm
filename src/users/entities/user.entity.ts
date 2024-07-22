import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: bigint;

    @Column({ unique: true })
    @IsNotEmpty()
    username: string;

    @Column()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ nullable: true, default: "auth" })
    auth_strategy: string;



}