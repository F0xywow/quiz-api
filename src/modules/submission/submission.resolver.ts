import { Resolver, Query } from "@nestjs/graphql";
import { Args } from "@nestjs/graphql";
import { Submission } from "./submission.entity";
import { SubmissionService } from "./submission.service";
import { Mutation } from "@nestjs/graphql";
import { CreateSubmissionInput } from "./dto/create_submission.input";

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

}
