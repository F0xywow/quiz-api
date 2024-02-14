import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { QuizModule } from "../quiz/quiz.module";
import { QuestionResolver } from "./question.resolver";
import { QuestionService } from "./question.service";

@Module({
    imports: [TypeOrmModule.forFeature([Question]),QuizModule],
    providers: [QuestionResolver,QuestionService],
    exports: []
})

export class QuestionModule {}