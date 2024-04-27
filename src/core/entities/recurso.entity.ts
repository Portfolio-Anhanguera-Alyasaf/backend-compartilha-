import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('recurso')
export class Recurso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @ManyToOne(() => Usuario, usuario => usuario.recursos)
    usuario: Usuario;
}