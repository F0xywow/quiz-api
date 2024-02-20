import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { Repository } from "typeorm";
import { CreateQuestionInput } from "./dto/create_question.input";
import { AnswerService } from "../answer/answer.service";

// Define the possible types of questions
type QusetionType = 'singleAnswer' | 'multipleAnswers' | 'sorting' | 'plainTextAnswer';

// Define the QuestionService
@Injectable()
export class QuestionService {
    // Inject necessary services and repositories in the constructor
    constructor(@InjectRepository(Question) 
    private questionRepository: Repository<Question>, 
    private answerService: AnswerService,
    ){}

    // Method to create a new Question
    async createQuestion(createQuestionInput: CreateQuestionInput, quizId: number){
        // Check if the question type is valid
        if (!['singleAnswer', 'multipleAnswers', 'sorting', 'plainTextAnswer'].includes(createQuestionInput.questionType)) {
            throw new Error('Invalid question type');
        }

        // Create a new Question
        const question = this.questionRepository.create(createQuestionInput);
        question.quizId = quizId;

        // Save the new Question in the repository
        const savedQuestion = await this.questionRepository.save(question);
        
        // For each answerInput, create a new Answer and add it to the Question
        for (const answerInput of createQuestionInput.answers) {
            const answer = await this.answerService.create(answerInput, question.id);
            savedQuestion.answers.push(answer);
        }
        
        // Save the updated Question in the repository
        return this.questionRepository.save(savedQuestion);
    }

    // Method to find all Questions
    findAllQuestions(): Promise<Question[]> {
        return this.questionRepository.find({relations: ['answers']});
    }

    // Method to find a single Question by id
    findOneQuestion(id: number): Promise<Question> {
        return this.questionRepository.findOne({where: {id: id},relations: ['answers']});
    }
}