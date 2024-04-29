import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedBack } from "../entities/feedback.entity";
import { FeedBackRepository } from "../repositories/feedback.repository";
import { SolicitacaoService } from "./solicitacao.service";

@Injectable()
export class FeedBackService {
    constructor(
        @InjectRepository(FeedBack)
        private readonly repository: FeedBackRepository,
        private readonly solicitacaoService: SolicitacaoService
    ) { }

    async avaliar(avaliadorId: number, avaliadoId: number, solicitacaoId: number, nota: number, comentario: string): Promise<FeedBack> {
        const solicitacao = await this.solicitacaoService.buscarSolicitacaoPorId(solicitacaoId);

        if (!solicitacao) throw new NotFoundException('Essa solicitação não foi encontrada. Tente novamente mais tarde.');

        if (solicitacao.proprietario.id !== avaliadorId) throw new UnauthorizedException('Você só pode avaliar o proprietário do recurso.');

        this.solicitacaoService.mudarStatusSolicitacao(solicitacao.id);

        const feedback = this.repository.create({
            avaliacao: nota,
            avaliado: { id: avaliadoId },
            avaliador: { id: avaliadorId },
            comentario: comentario
        });
        return await this.repository.save(feedback);
    }
}