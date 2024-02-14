import { Module } from "@nestjs/common";
import { QuizResolver } from "./quiz.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "../question/question.entity";
import { Quiz } from "./quiz.entity";
import { QuizService } from "./quiz.service";


@Module({
    imports: [TypeOrmModule.forFeature([Quiz])],
    providers: [QuizResolver,QuizService],
    exports: [QuizService]
})
export class QuizModule {}