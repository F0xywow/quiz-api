import { Injectable } from "@nestjs/common";
import { Quiz}  from "./quiz.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQuizInput } from "./dto/create_quiz.input";
import { QuestionService } from "../question/question.service";

// Define the QuizService
@Injectable()
export class QuizService {
    // Inject necessary services and repositories in the constructor
    constructor(@InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    private questionService: QuestionService,
    ){}

    // Method to create a new Quiz
    async createQuiz(createQuizInput: CreateQuizInput){
        // Create a new Quiz
        let quiz = this.quizRepository.create(createQuizInput);

        // Save the new Quiz in the repository
        quiz = await this.quizRepository.save(quiz);

        // For each questionInput, create a new Question and add it to the Quiz
        for(const questionInput of createQuizInput.questions){
            const question = await this.questionService.createQuestion(questionInput,quiz.id);
            quiz.questions.push(question);
        }
        
        // Save the updated Quiz in the repository
        return this.quizRepository.save(quiz);
    }

    // Method to find all Quizzes
    findAllQuizzes(){
        return this.quizRepository.find({relations: ['questions', 'questions.answers']});
    }

    // Method to find a single Quiz by id
    findOneQuiz(id: number){
        return this.quizRepository.findOne({where: {id: id},relations: ['questions', 'questions.answers']});
    }
}