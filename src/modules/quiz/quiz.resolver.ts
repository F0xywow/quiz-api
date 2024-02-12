import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.entity';
import { Question } from '../question/question.entity';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Mutation(() => Quiz)
  async createQuiz(
    @Args('name') name: string,
    @Args('questions') questions: string[],
    @Args('answers') answers: string[][],
    ): Promise<Quiz> {
    return this.quizService.createQuiz(name, questions, answers);
  }

 /* @Query(() => [Question])
  async getQuestions(
    @Args('quizId') quizId: number
  ): Promise<Question[]> {
    return this.quizService.getQuestions(quizId);
  }

  @Mutation(() => QuizResult)
  async checkAnswers(
    @Args('quizId') quizId: number,
    @Args('answers') answers: string[]
    ): Promise<QuizResult> {
    return this.quizService.checkAnswers(quizId, answers);
    }*/
}
