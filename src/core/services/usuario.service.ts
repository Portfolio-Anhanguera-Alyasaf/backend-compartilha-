import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Usuario } from "../entities/usuario.entity";
import { UsuarioRepository } from "../repositories/user.repository";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private repository: UsuarioRepository,
    ) { }

    async insertUsuario(entity: Usuario): Promise<Usuario> {
        entity.senha = await bcrypt.hash(entity.senha, 10);
        const usuario = this.repository.create(entity);
        return await this.repository.save(usuario);
    }

    async findByEmail(email: string): Promise<Usuario | undefined> {
        return this.repository.findOne({ where: { email } });
    }
}