import { Resolver, Query, Int, ObjectType, Field } from "@nestjs/graphql";
import { Args } from "@nestjs/graphql";
import { Submission } from "./submission.entity";
import { SubmissionService } from "./submission.service";
import { Mutation } from "@nestjs/graphql";
import { CreateSubmissionInput } from "./dto/create_submission.input";

@ObjectType()
class ResultType{
    @Field(type => Int)
    totalPoints: number;

    @Field(type => Int)
    obtainedPoints: number;
}

@Resolver(() => Submission)
export class SubmissionResolver {
    constructor(private submissionService: SubmissionService){}

    @Query(() => Submission)
    findOneSubmission(@Args('id') id: number): Promise<Submission> {
        return this.submissionService.findOneSubmission(id);
    }

    @Query(() => [Submission])
    findAllSubmissions(): Promise<Submission[]> {
        return this.submissionService.findAllSubmissions();
    }

    @Mutation(() => Submission)
    createSubmission(
        @Args('createSubmissionInput') createSubmissionInput: CreateSubmissionInput,
        ): Promise<Submission> {
        return this.submissionService.create(createSubmissionInput);
    }

    @Query(() => ResultType)
  async calculateResult(@Args('submissionId', { type: () => Int }) submissionId: number): Promise<ResultType> {
    return this.submissionService.calculateResult(submissionId);
  }
}
