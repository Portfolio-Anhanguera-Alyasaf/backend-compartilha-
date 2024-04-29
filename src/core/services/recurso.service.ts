import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recurso } from "../entities/recurso.entity";
import { RecursoRepository } from "../repositories/recurso.repository";

@Injectable()
export class RecursoService {
    constructor(
        @InjectRepository(Recurso)
        private readonly repository: RecursoRepository
    ) { }

    async insertRecurso(entity: Recurso, idUsuario: number): Promise<Recurso> {
        const recurso = this.repository.create({ ...entity, usuario: { id: idUsuario } });
        return await this.repository.save(recurso);
    }

    async buscarRecursoPorNome(nome: string): Promise<Recurso | undefined> {
        return this.repository.findOne({ where: { nome }, relations: ['usuario'] });
    }

    async verificarDisponibilidade(id: number): Promise<Recurso | null> {
        return this.repository.findOne({ where: { id }, relations: ['usuario'] });
    }
}