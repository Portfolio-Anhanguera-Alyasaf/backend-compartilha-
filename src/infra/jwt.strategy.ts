import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "src/core/services/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'your_secret_key',
        });
    }

    async validate(payload: any) {
        const usuario = await this.authService.validarUsuarioByEmail(payload.email);
        console.log(usuario);
        if (!usuario) {
            throw new UnauthorizedException('O usuário não foi encontrado');
        }

        if (!usuario.id) {
            throw new NotFoundException('ID não encontrado')
        }

        return usuario.id;
    }
}