import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SolicitacaoService } from "src/core/services/solicitacao.service";

@Controller('api/v1/ws-solicitacao')
export class SolicitacaoController {
    constructor(
        private readonly service: SolicitacaoService
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async solicitarRecurso(@Body('nomeRecurso') nomeRecurso: string, @Req() req): Promise<any> {
        const solicitante = req.user;
        return await this.service.solicitarRecurso(solicitante, nomeRecurso);
    }
}