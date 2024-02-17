import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer } from "./answer.entity";
import { QuestionModule } from "../question/question.module";
import { AnswerResolver } from "./answer.resolver";
import { AnswerService } from "./answer.service";
import { forwardRef } from "@nestjs/common";

@Module({
    imports:[TypeOrmModule.forFeature([Answer]),forwardRef(() =>QuestionModule)],
    providers:[AnswerResolver,AnswerService],
    exports:[AnswerService]
})

export class AnswerModule {}