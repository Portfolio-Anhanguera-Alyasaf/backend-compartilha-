import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "./usuario.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    async validarUsuario(email: string, senha: string): Promise<any> {
        const usuario = await this.usuarioService.findByEmail(email);
        if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
            const { senha, ...result } = usuario;
            return result;
        }

        return null;
    }

    async login(entity: Usuario | null): Promise<{ access_token: string }> {
        const usuario = await this.validarUsuario(entity.email, entity.senha);
        if (!usuario) throw new UnauthorizedException('Crendenciais inválidas');
        const payload = { email: usuario.email, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}