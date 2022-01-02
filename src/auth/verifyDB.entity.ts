import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'verifyDB'})

export class VerifyDBEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    did: string

    @Column()
    value: string
}