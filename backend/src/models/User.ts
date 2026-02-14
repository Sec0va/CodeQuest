import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ContestResult } from "./ContestResult";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar", unique: true})
    email!: string;

    @Column({type: "varchar"})
    password!: string;

    @Column({type: "varchar"})
    name!: string;

    @Column({type: "varchar", default: 'user'})
    role!: 'admin' | 'organizer' | 'user';

    @Column({type: "varchar", nullable: true})
    avatar?: string;

    @Column({type: "varchar", nullable: true})
    location?: string;

    @Column({type: "int", default: 0})
    rating!: number;

    @Column({type: "int", default: 0})
    participations!: number;

    @Column({type: "int", default: 0})
    solved!: number;

    @Column({type: "boolean", default: false})
    isBanned!: boolean;

    @OneToMany(() => ContestResult, (result) => result.user)
    results?: ContestResult[];
}
