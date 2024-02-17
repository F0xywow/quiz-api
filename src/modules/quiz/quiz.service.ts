import { Injectable } from "@nestjs/common";
import { Quiz}  from "./quiz.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { createQuizInput } from "./dto/create_quiz.input";

@Injectable()
export class QuizService {
    constructor(@InjectRepository(Quiz) private quizRepository: Repository<Quiz>){}

    create(createQuizInput: createQuizInput){
        const quiz = this.quizRepository.create(createQuizInput);
        
        return this.quizRepository.save(quiz);
    }

    findAll(){
        return this.quizRepository.find();
    }

    findOneQuiz(id: number){
        return this.quizRepository.findOne({where: {id: id}});
    }
    

    
}