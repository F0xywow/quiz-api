import { Resolver, Args, ResolveField, Parent, Query, Mutation } from "@nestjs/graphql";
import { Answer } from "./answer.entity";
import { Inject } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { Question } from "../question/question.entity";
import { CreateAnswerInput } from "./dto/create_answer.input";


@Resolver(() => Answer)
export class AnswerResolver{
    constructor(@Inject(AnswerService) private answerService: AnswerService) {}

    @Query(() => Answer)
    findOneAnswer(
        @Args('id') id: number
        ): Promise<Answer>{
            return this.answerService.findOneAnswer(id);
        }

    @Query(() => [Answer])
    findAllAnswers(): Promise<Answer[]>{
        return this.answerService.findAllAnswers();
    }

    @ResolveField(returns => Question)
    question(@Parent() answer: Answer): Promise<Question>{
        return this.answerService.getQuestion(answer.questionId);
    }

    @Mutation(() => Answer)
    createAnswer(
        @Args('CreateAnswerInput') createAnswerInput: CreateAnswerInput
        ): Promise<Answer>{
            return this.answerService.createAnswer(createAnswerInput);
        }

}