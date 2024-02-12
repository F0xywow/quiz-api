import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizResolver } from "./quiz.resolver";
import { QuizService } from "./quiz.service";
import { Quiz } from "./quiz.entity";
import { Answer } from "../answer/answer.entity"; // import Answer entity
import { QuestionModule } from "../question/question.module"; // import QuestionModule

@Module({
    imports: [
        TypeOrmModule.forFeature([Quiz, Answer]), // add Answer entity
        QuestionModule, // import QuestionModule
    ],
    providers: [QuizResolver, QuizService],
})
export class QuizModule {}