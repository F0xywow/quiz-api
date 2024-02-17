import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { Repository } from "typeorm";
import { CreateQuestionInput } from "./dto/create_question.input";
import { AnswerService } from "../answer/answer.service";

type QusetionType = 'singleAnswer' | 'multipleAnswers' | 'sorting' | 'plainTextAnswer';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) 
    private questionRepository: Repository<Question>, 
    private answerService: AnswerService,
    ){}

    async createQuestion(createQuestionInput: CreateQuestionInput, quizId: number){
        if (!['singleAnswer', 'multipleAnswers', 'sorting', 'plainTextAnswer'].includes(createQuestionInput.questionType)) {
            throw new Error('Invalid question type');
          }
        const question = this.questionRepository.create(createQuestionInput);
        question.quizId = quizId;
        
        for (const answerInput of createQuestionInput.answers) {
            const answer = await this.answerService.create(answerInput);
            question.answers.push(answer);
        }
        
        return this.questionRepository.save(question);
    }

    findAllQuestions(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    findOneQuestion(id: number): Promise<Question> {
        return this.questionRepository.findOne({where: {id: id}});
    }

    findAllQuestionsByQuiz(quiz_id: number): Promise<Question[]> {
        return this.questionRepository.find({where: {quizId: quiz_id}});
    }
   
}