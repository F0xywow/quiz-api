import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { Repository } from "typeorm";
import { QuizService } from "../quiz/quiz.service";
import { Quiz } from "../quiz/quiz.entity";
import { CreateQuestionInput } from "./dto/create_question.input";

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private questionRepository: Repository<Question>, private QuizService: QuizService){}

    createQuestion(createQuestionInput: CreateQuestionInput): Promise<Question> {
        const question = this.questionRepository.create(createQuestionInput);

        return this.questionRepository.save(question);
    }

    findAllQuestions(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    findOneQuestion(id: number): Promise<Question> {
        return this.questionRepository.findOne({where: {id: id}});
    }

    getQuiz(quiz_id: number): Promise<Quiz> {
        return this.QuizService.findOneQuiz(quiz_id);
    }

}