import { Body, Controller, Post } from "@nestjs/common";
import { Usuario } from "src/core/entities/usuario.entity";
import { UsuarioService } from "src/core/services/usuario.service";

@Controller('api/v1/ws-user')
export class UsuarioController {
    constructor(
        private readonly service: UsuarioService
    ) { }

    @Post()
    async createUsuario(@Body() entity: Usuario): Promise<Usuario> {
        return await this.service.insertUsuario(entity);
    }
}