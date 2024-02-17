import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { Quiz } from "./quiz.entity";
import { QuizService } from './quiz.service';
import { CreateQuizInput } from './dto/create_quiz.input';
import { Inject } from '@nestjs/common';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(private quizService: QuizService){}

    @Mutation(() => Quiz)
    createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput): Promise<Quiz> {
        return this.quizService.createQuiz(createQuizInput);
    }

    @Query(() => [Quiz])
    findAllQuizzes(): Promise<Quiz[]> {
        return this.quizService.findAll();
    }

    @Query(() => Quiz)
    findOneQuiz(@Args('id', {type: () => Int}) id: number): Promise<Quiz> {
        return this.quizService.findOneQuiz(id);
    }

}
