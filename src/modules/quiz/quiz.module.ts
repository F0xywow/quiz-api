import { Module } from "@nestjs/common";
import { QuizResolver } from "./quiz.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "../question/question.model";
import { Quiz } from "./quiz.model";


@Module({
    imports: [TypeOrmModule.forFeature([Quiz,Question])],
    providers: [QuizResolver],
})
export class QuizModule {}