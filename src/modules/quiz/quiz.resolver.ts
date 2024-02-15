import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { Quiz } from "./quiz.entity";
import { QuizService } from './quiz.service';
import { createQuizInput } from './dto/create_quiz.input';
import { text } from 'stream/consumers';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(private quizService: QuizService){}

    @Mutation(() => Quiz)
    createQuiz(@Args('createQuizInput') createQuizInput: createQuizInput): Promise<Quiz> {
        return this.quizService.create(createQuizInput);
    }

    @Query(() => [Quiz], {name: 'getQuizzes'})
    findAllQuizzes(): Promise<Quiz[]> {
        return this.quizService.findAll();
    }

    @Query(() => Quiz, {name: 'getQuiz'})
    findOneQuiz(@Args('id', {type: () => Int}) id: number): Promise<Quiz> {
        return this.quizService.findOne(id);
    }

}
