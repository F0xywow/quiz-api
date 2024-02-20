import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Answer } from "./answer.entity";
import { CreateAnswerInput } from "./dto/create_answer.input";

@Injectable()
export class AnswerService {
    constructor(@InjectRepository(Answer) 
    private answerRepository: Repository<Answer>, 
    ){}

    create(createAnswerInput: CreateAnswerInput, questionId: number): Promise<Answer> {
        const answer = this.answerRepository.create(createAnswerInput);
        answer.questionId = questionId;

        return this.answerRepository.save(answer);
    }

    findAllAnswers(): Promise<Answer[]>{
        return this.answerRepository.find();
    }

    findOneAnswer(id: number): Promise<Answer> {
        return this.answerRepository.findOne({where: {id: id}});
    }

    findAllAnswersByQuestion(question_id: number): Promise<Answer[]> {
        return this.answerRepository.find({where: {questionId: question_id}});
    }

    findCorrectAnswers(question_id: number): Promise<Answer[]> {
        return this.answerRepository.find({where: {questionId: question_id, isCorrect: true}});
    }
}