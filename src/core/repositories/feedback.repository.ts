import { EntityRepository, Repository } from "typeorm";
import { FeedBack } from "../entities/feedback.entity";

@EntityRepository(FeedBack)
export class FeedBackRepository extends Repository<FeedBack> { }