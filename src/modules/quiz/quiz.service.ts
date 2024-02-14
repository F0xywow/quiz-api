import { Injectable } from "@nestjs/common";
import { Quiz}  from "./quiz.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { createQuizInput } from "./dto/create_quiz.input";

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz) private quizRepository: Repository<Quiz>){}

    async find(): Promise<Quiz[]> {
        return this.quizRepository.find();
    }

    async findWhere(options: any): Promise<Quiz> {
        return this.quizRepository.findOne(options);
    }
    

    
}