import { Injectable } from "@nestjs/common";
import { Quiz}  from "./quiz.entity";

@Injectable()
export class QuizService {
    async getQuestions(quiz: Quiz) {
        return quiz.questions;
    }

    async getQuizzes() {
        return Quiz;
    }
}