import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { Quiz } from "./quiz.entity";
import { QuizService } from './quiz.service';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(private quizService: QuizService){}

    @Query(() => [Quiz])
    async getQuizes(): Promise<Quiz[]>{
        return this.quizService.find();
    }

    @Query(() => Quiz)
    async getQuestionsByQuizId(quizId: number): Promise<Quiz>{
        return this.quizService.findWhere({ where: { id: quizId }, relations: ["questions"] });
    }
}