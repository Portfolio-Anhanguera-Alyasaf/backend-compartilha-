import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FeedBackService } from "src/core/services/feedback.service";

@Controller('api/v1/ws-feedback')
export class FeedBackController {
    constructor(
        private readonly service: FeedBackService
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async avaliar(
        @Body('avaliadoId') avaliadoId: number,
        @Body('solicitacaoId') solicitacaoId: number,
        @Body('nota') nota: number,
        @Body('comentario') comentario: string,
        @Req() req,
    ): Promise<any> {
        const avaliadorId = req.user;
        return await this.service.avaliar(avaliadorId, avaliadoId, solicitacaoId, nota, comentario);
    }
}