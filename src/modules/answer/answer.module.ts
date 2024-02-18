import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer } from "./answer.entity";
import { QuestionModule } from "../question/question.module";
import { AnswerResolver } from "./answer.resolver";
import { AnswerService } from "./answer.service";
import { forwardRef } from "@nestjs/common";
import { Question } from "../question/question.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Answer,Question]),forwardRef(() =>QuestionModule)],
    providers:[AnswerResolver,AnswerService],
    exports:[AnswerService]
})

export class AnswerModule {}