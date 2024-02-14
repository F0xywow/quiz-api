import { Injectable } from "@nestjs/common";
import { Quiz}  from "./quiz.model";

@Injectable()
export class QuizService {
    async getQuestions(quiz: Quiz) {
        return quiz.questions;
    }
}