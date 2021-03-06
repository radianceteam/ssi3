import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})

export class UsersEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    did: string

    @Column()
    status: string
}