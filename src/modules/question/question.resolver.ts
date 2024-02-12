import { Resolver, Args, Query } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question])
  async getQuestions(
    @Args('quizId') quizId: number
  ): Promise<Question[]> {
    return this.questionService.getQuestions(quizId);
  }
}