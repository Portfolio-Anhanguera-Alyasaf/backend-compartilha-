import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusSolicitacao } from "../enums/status.enum";
import { Recurso } from "./recurso.entity";
import { Usuario } from "./usuario.entity";

@Entity('solicitacao')
export class Solicitacao {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario)
    solicitante: Usuario;

    @ManyToOne(() => Usuario)
    proprietario: Usuario;

    @ManyToOne(() => Recurso)
    recurso: Recurso;

    @Column({ type: 'enum', enum: StatusSolicitacao, default: StatusSolicitacao.DISPONIVEL })
    status: StatusSolicitacao;
}