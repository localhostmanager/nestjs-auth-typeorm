import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;


    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    age: number;

    @Column()
    dob: Date;
}