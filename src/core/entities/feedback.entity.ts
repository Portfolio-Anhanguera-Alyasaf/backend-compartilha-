import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('feedback')
export class FeedBack {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comentario: string;

    @Column({ type: 'int' })
    avaliacao: number;

    @ManyToOne(() => Usuario)
    avaliador: Usuario;

    @ManyToOne(() => Usuario)
    avaliado: Usuario;
}