import { Resolver, Args, ResolveField, Parent, Query, Mutation } from "@nestjs/graphql";
import { Answer } from "./answer.entity";
import { AnswerService } from "./answer.service";
import { CreateAnswerInput } from "./dto/create_answer.input";


@Resolver(() => Answer)
export class AnswerResolver{
    constructor(private answerService: AnswerService) {}

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

    @Mutation(() => Answer)
    createAnswer(
        @Args('CreateAnswerInput') createAnswerInput: CreateAnswerInput,
        @Args('questionId') questionId: number
        ): Promise<Answer>{
            return this.answerService.create(createAnswerInput, questionId);
        }

}