import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer } from "./answer.entity";
import { QuestionModule } from "../question/question.module";
import { AnswerResolver } from "./answer.resolver";
import { AnswerService } from "./answer.service";

@Module({
    imports:[TypeOrmModule.forFeature([Answer]),QuestionModule],
    providers:[AnswerResolver,AnswerService]
})

export class AnswerModule {}