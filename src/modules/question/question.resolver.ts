import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { CreateQuestionInput } from "./dto/create_question.input";
import { ResolveField, Parent } from "@nestjs/graphql";
import { Quiz } from "../quiz/quiz.entity";

@Resolver(() => Question)
export class QuestionResolver {
    constructor(private questionService: QuestionService){}

    @Query(() => Question, {name: 'getQuestion'})
    findOneQuestion(@Args('id') id: number): Promise<Question> {
        return this.questionService.findOneQuestion(id);
    }

    @Query(() => [Question], {name: 'getQuestions'})
    findAllQuestions(): Promise<Question[]> {
        return this.questionService.findAllQuestions();
    }

    @ResolveField(returns => Quiz, {name: 'quiz'})
    quiz(@Parent() question : Question): Promise<Quiz>{
        return this.questionService.getQuiz(question.quizId);
    }

    @Mutation((returns) => Question)
    createQuestion(
        @Args('createQuestionInput') createQuestionInput: CreateQuestionInput
        ): Promise<Question> {
        return this.questionService.createQuestion(createQuestionInput);
    }

}