import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { Quiz } from "./quiz.entity";
import { QuizService } from './quiz.service';
import { createQuizInput } from './dto/create_quiz.input';
import { Inject } from '@nestjs/common';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(@Inject(QuizService) private quizService: QuizService){}

    @Mutation(() => Quiz)
    createQuiz(@Args('createQuizInput') createQuizInput: createQuizInput): Promise<Quiz> {
        return this.quizService.create(createQuizInput);
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
