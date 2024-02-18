import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { Quiz } from "./quiz.entity";
import { QuizService } from './quiz.service';
import { CreateQuizInput } from './dto/create_quiz.input';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(private quizService: QuizService){}

    @Mutation(() => Quiz)
    createQuiz(@Args('createQuizInput') createQuizInput: CreateQuizInput): Promise<Quiz> {
        return this.quizService.createQuiz(createQuizInput);
    }

    @Query(() => [Quiz])
    findAllQuizzes(): Promise<Quiz[]> {
        return this.quizService.findAllQuizzes();
    }

    @Query(() => Quiz)
    findOneQuiz(@Args('id', {type: () => Int}) id: number){
        return this.quizService.findOneQuiz(id);
    }

    @Query(() => Quiz)
    findQuestions(@Args('quiz_id', {type: () => Int}) quiz_id: number){
        return this.quizService.getQuestions(quiz_id);
    }

}
