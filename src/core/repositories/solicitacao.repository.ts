import { EntityRepository, Repository } from "typeorm";
import { Solicitacao } from "../entities/solicitacao.entity";

@EntityRepository(Solicitacao)
export class SolicitacaoRepository extends Repository<Solicitacao> { }