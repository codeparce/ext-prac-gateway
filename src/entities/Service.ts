import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "varchar", unique: true })
    name!: string;

    @Column({ type: "varchar", unique: true })
    service!: string;

    @Column({ type: "varchar" })
    url!: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
}