import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { Repository } from "typeorm";
import { QuizService } from "../quiz/quiz.service";
import { Quiz } from "../quiz/quiz.entity";
import { CreateQuestionInput } from "./dto/create_question.input";
import { AnswerService } from "../answer/answer.service";

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) 
    private questionRepository: Repository<Question>, 
    private answerService: AnswerService,
    ){}

    async createQuestion(createQuestionInput: CreateQuestionInput, quizId: number){
        const question = this.questionRepository.create(createQuestionInput);
        question.quizId = quizId;


        
        // Assuming you have an answerService that can create an answer
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

   /* getQuiz(quiz_id: number): Promise<Quiz> {
        return this.quizService.findOneQuiz(quiz_id);
    }
*/
}