import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Contest {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar"})
    title!: string;

    @Column({type: "varchar"})
    platform!: string;

    @Column({type: "timestamp"})
    startTime!: Date;

    @Column({type: "varchar"})
    duration!: string;

    @Column({type: "varchar"})
    url!: string;

    @Column({type: "varchar", nullable: true})
    description?: string;
}
