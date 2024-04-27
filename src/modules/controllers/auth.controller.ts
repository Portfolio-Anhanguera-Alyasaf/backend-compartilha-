import { Body, Controller, Post } from "@nestjs/common";
import { Usuario } from "src/core/entities/usuario.entity";
import { AuthService } from "src/core/services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    @Post('login')
    async login(@Body() req: Usuario): Promise<any> {
        const usuario = req;
        return await this.service.login(usuario.email, usuario.senha);
    }
}