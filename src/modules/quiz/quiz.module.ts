import { Module } from "@nestjs/common";
import { QuizResolver } from "./quiz.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "../question/question.entity";
import { Quiz } from "./quiz.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Quiz,Question])],
    providers: [QuizResolver],
})
export class QuizModule {}