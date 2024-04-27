import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Recurso } from "src/core/entities/recurso.entity";
import { RecursoService } from "src/core/services/recurso.service";

@Controller('api/v1/ws-resources')
export class RecursoController {
    constructor(
        private readonly service: RecursoService
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createRecurso(@Body() entity: Recurso, @Req() req): Promise<any> {
        const idUsuario = req.user;
        return await this.service.insertRecurso(entity, idUsuario);
    }
}