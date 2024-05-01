import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Solicitacao } from "../entities/solicitacao.entity";
import { StatusSolicitacao } from "../enums/status.enum";
import { SolicitacaoRepository } from "../repositories/solicitacao.repository";
import { RecursoService } from "./recurso.service";

@Injectable()
export class SolicitacaoService {
    constructor(
        @InjectRepository(Solicitacao)
        private readonly repository: SolicitacaoRepository,
        private readonly recursoService: RecursoService,
    ) { }

    async solicitarRecurso(idSolicitante: number, nomeRecurso: string): Promise<Solicitacao> {
        const recurso = await this.recursoService.buscarRecursoPorNome(nomeRecurso);
        if (!recurso) throw new NotFoundException('Esse recurso não foi encontrado encontrado. Tente novamente mais tarde.');

        const solicitacao = this.repository.create({
            proprietario: recurso.usuario ? { id: recurso.usuario.id } : null,
            recurso: recurso,
            solicitante: { id: idSolicitante },
            status: StatusSolicitacao.PENDENTE
        });
        return this.repository.save(solicitacao);
    }

    async confirmarAlocacao(idSolicitante: number, id: number): Promise<void> {
        const solicitacao = await this.repository.findOne({ where: { id }, relations: ['proprietario'] });
        if (!solicitacao) throw new NotFoundException('Solicitação não encontrada. Tente novamente mais tarde.');

        const recursoProprietarioId = solicitacao.proprietario.id;
        const usuarioAutenticadoId = idSolicitante;
        if (recursoProprietarioId !== usuarioAutenticadoId) throw new UnauthorizedException('Você não tem permissão para confirmar esta alocação.');

        solicitacao.status = StatusSolicitacao.ACEITA;

        await this.repository.save(solicitacao);
    }

    async buscarSolicitacaoPorId(id: number): Promise<Solicitacao> {
        return this.repository.findOne({ where: { id }, relations: ['proprietario'] });
    }

    async mudarStatusSolicitacao(id: number): Promise<void> {
        const solicitacao = await this.buscarSolicitacaoPorId(id);
        solicitacao.status = StatusSolicitacao.ENCERRADA;

        await this.repository.save(solicitacao);
    }

    async buscarPorTodas(userId: number): Promise<Solicitacao[]> {
        return this.repository.find({
            where: {
                proprietario: { id: userId },
                status: StatusSolicitacao.PENDENTE
            },
            relations: ['recurso']
        });
    }

    async buscarPorTodasFeitas(userId: number): Promise<Solicitacao[]> {
        return this.repository.find({
            where: {
                solicitante: { id: userId },
                status: StatusSolicitacao.ACEITA || StatusSolicitacao.ENCERRADA,
            }
        });
    }
}