import { Module } from "@nestjs/common";
import { QuizResolver } from "./quiz.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Quiz } from "./quiz.entity";
import { QuizService } from "./quiz.service";
import { QuestionModule } from "../question/question.module";
import { forwardRef } from "@nestjs/common";


@Module({
    imports: [TypeOrmModule.forFeature([Quiz]),forwardRef(() => QuestionModule)],
    providers: [QuizResolver,QuizService],
    exports: [QuizService]
})
export class QuizModule {}