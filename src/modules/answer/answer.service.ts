import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Answer } from "./answer.entity";
import { CreateAnswerInput } from "./dto/create_answer.input";
import { Question } from "../question/question.entity";
import { QuestionService } from "../question/question.service";

@Injectable()
export class AnswerService {
    constructor(@InjectRepository(Answer) private answerRepository: Repository<Answer>, private QuestionService:QuestionService){}

    createAnswer(createAnswerInput: CreateAnswerInput): Promise<Answer> {
        const answer = this.answerRepository.create(createAnswerInput);

        return this.answerRepository.save(answer);
    }

    findAllAnswers(): Promise<Answer[]>{
        return this.answerRepository.find();
    }

    findOneAnswer(id: number): Promise<Answer> {
        return this.answerRepository.findOne({where: {id: id}});
    }

    getQuestion(question_id: number): Promise<Question> {
        return this.QuestionService.findOneQuestion(question_id);
    }
}