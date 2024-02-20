import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Answer } from "./answer.entity";
import { CreateAnswerInput } from "./dto/create_answer.input";

// Define the AnswerService
@Injectable()
export class AnswerService {
    // Inject the Answer repository in the constructor
    constructor(@InjectRepository(Answer) 
    private answerRepository: Repository<Answer>, 
    ){}

    // Method to create a new Answer
    create(createAnswerInput: CreateAnswerInput, questionId: number): Promise<Answer> {
        // Create a new Answer
        const answer = this.answerRepository.create(createAnswerInput);
        // Set the questionId of the new Answer
        answer.questionId = questionId;

        // Save the new Answer in the repository
        return this.answerRepository.save(answer);
    }

    // Method to find all Answers
    findAllAnswers(): Promise<Answer[]>{
        return this.answerRepository.find();
    }

    // Method to find a single Answer by id
    findOneAnswer(id: number): Promise<Answer> {
        return this.answerRepository.findOne({where: {id: id}});
    }

    // Method to find all Answers for a specific question
    findAllAnswersByQuestion(question_id: number): Promise<Answer[]> {
        return this.answerRepository.find({where: {questionId: question_id}});
    }

    // Method to find all correct Answers for a specific question
    findCorrectAnswers(question_id: number): Promise<Answer[]> {
        return this.answerRepository.find({where: {questionId: question_id, isCorrect: true}});
    }
}