import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Recurso } from "./recurso.entity";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ unique: true })
    email: string;

    @Column()
    senha: string;

    @OneToMany(() => Recurso, recurso => recurso.usuario)
    recursos: Recurso[];
}