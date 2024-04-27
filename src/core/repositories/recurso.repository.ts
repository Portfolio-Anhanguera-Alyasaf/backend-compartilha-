import { EntityRepository, Repository } from "typeorm";
import { Recurso } from "../entities/recurso.entity";

@EntityRepository(Recurso)
export class RecursoRepository extends Repository<Recurso> { }