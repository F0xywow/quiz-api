import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { CreateQuestionInput } from "./dto/create_question.input";
import { ResolveField, Parent } from "@nestjs/graphql";
import { Quiz } from "../quiz/quiz.entity";
import { Inject } from "@nestjs/common";

@Resolver(() => Question)
export class QuestionResolver {
    constructor(@Inject(QuestionService) private questionService: QuestionService){}

    @Query(() => Question)
    findOneQuestion(@Args('id') id: number): Promise<Question> {
        return this.questionService.findOneQuestion(id);
    }

    @Query(() => [Question])
    findAllQuestions(): Promise<Question[]> {
        return this.questionService.findAllQuestions();
    }

    @ResolveField(returns => Quiz)
    quiz(@Parent() question : Question): Promise<Quiz>{
        return this.questionService.getQuiz(question.quizId);
    }

    @Mutation(() => Question)
    createQuestion(
        @Args('createQuestionInput') createQuestionInput: CreateQuestionInput
        ): Promise<Question> {
        return this.questionService.createQuestion(createQuestionInput);
    }

}