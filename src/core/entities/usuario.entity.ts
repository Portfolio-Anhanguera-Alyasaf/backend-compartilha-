import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FeedBack } from "./feedback.entity";
import { Recurso } from "./recurso.entity";
import { Solicitacao } from "./solicitacao.entity";

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

    @OneToMany(() => Solicitacao, solicitacao => solicitacao.solicitante)
    solicitacoesFeitas: Solicitacao;

    @OneToMany(() => Solicitacao, solicitacao => solicitacao.proprietario)
    solicitacoesRecebidas: Solicitacao[];

    @OneToMany(() => FeedBack, feedback => feedback.avaliado)
    feedbacksRecebidos: FeedBack[];
}