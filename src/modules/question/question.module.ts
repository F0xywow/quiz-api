import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { QuizModule } from "../quiz/quiz.module";
import { QuestionResolver } from "./question.resolver";
import { QuestionService } from "./question.service";
import { AnswerModule } from "../answer/answer.module";
import { forwardRef } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Question]),forwardRef(() => QuizModule),AnswerModule],
    providers: [QuestionResolver,QuestionService],
    exports: [QuestionService]
})

export class QuestionModule {}