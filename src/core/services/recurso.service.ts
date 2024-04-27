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
}