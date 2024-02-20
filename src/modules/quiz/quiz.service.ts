import { Injectable } from "@nestjs/common";
import { Quiz}  from "./quiz.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQuizInput } from "./dto/create_quiz.input";
import { QuestionService } from "../question/question.service";

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    private questionService: QuestionService,
    ){}

    async createQuiz(createQuizInput: CreateQuizInput){
        let quiz = this.quizRepository.create(createQuizInput);

        quiz = await this.quizRepository.save(quiz);

        for(const questionInput of createQuizInput.questions){
            const question = await this.questionService.createQuestion(questionInput,quiz.id);
            quiz.questions.push(question);
        }
        
        return this.quizRepository.save(quiz);
    }

    findAllQuizzes(){
        return this.quizRepository.find({relations: ['questions', 'questions.answers']});
    }

    findOneQuiz(id: number){
        return this.quizRepository.findOne({where: {id: id},relations: ['questions', 'questions.answers']});
    }

    getQuestions(quiz_id: number){
        return this.questionService.findAllQuestionsByQuiz(quiz_id);
    }
    
}