import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repositories/user.repository";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private repository: UsuarioRepository,
    ) { }

    async insertUsuario(entity: Usuario): Promise<Usuario> {
        const usuario = this.repository.create(entity);
        return await this.repository.save(usuario);
    }
}