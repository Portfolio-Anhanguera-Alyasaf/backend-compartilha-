import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UsuarioService } from "./usuario.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    async validarUsuarioByEmail(email: string): Promise<any> {
        const usuario = await this.usuarioService.findByEmail(email);
        if (usuario) {
            return usuario;
        }

        return null;
    }

    async login(email: string, senha: string): Promise<{ access_token: string }> {
        const usuario = await this.validarUsuarioByEmail(email);
        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) throw new UnauthorizedException('Crendenciais inválidas');
        const payload = { email: usuario.email, sub: usuario.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}