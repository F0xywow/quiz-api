import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { Repository } from "typeorm";
import { CreateQuestionInput } from "./dto/create_question.input";
import { AnswerService } from "../answer/answer.service";

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) 
    private questionRepository: Repository<Question>, 
    private answerService: AnswerService,
    ){}

    async createQuestion(createQuestionInput: CreateQuestionInput, quizId: number) {
        let question;
    
        switch (createQuestionInput.questionType) {
          case 'singleCorrectAnswer':
            question = await this.questionRepository.create(
              createQuestionInput
            );
            break;
          case 'multipleCorrectAnswers':
            question = await this.questionRepository.create(
                createQuestionInput
              );
            break;
          case 'sorting':
            question = await this.questionRepository.create(
                createQuestionInput
              );
            break;
          case 'plainTextAnswer':
            question = await this.questionRepository.create(
                createQuestionInput
              );
            break;
          default:
            throw new Error('Invalid question type');
        }
    
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