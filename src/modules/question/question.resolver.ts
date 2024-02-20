import { Args, Resolver, Query, Mutation, Int } from "@nestjs/graphql";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { CreateQuestionInput } from "./dto/create_question.input";

@Resolver(() => Question)
export class QuestionResolver {
    constructor(private questionService: QuestionService){}

    @Query(() => Question)
    findOneQuestion(@Args('id') id: number): Promise<Question> {
        return this.questionService.findOneQuestion(id);
    }

    @Query(() => [Question])
    findAllQuestions(): Promise<Question[]> {
        return this.questionService.findAllQuestions();
    }

    @Query(() => [Question])
    findAllQuestionsByQuiz(
        @Args('quizId', { type: () => Int }) quizId: number
        ): Promise<Question[]> {
        return this.questionService.findAllQuestionsByQuiz(quizId);
    }

    @Mutation(() => Question)
    createQuestion(
        @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
        @Args('quizId', { type: () => Int }) quizId: number
        ): Promise<Question> {
        return this.questionService.createQuestion(createQuestionInput, quizId);
    }

}