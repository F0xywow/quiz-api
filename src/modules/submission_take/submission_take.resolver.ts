import { Resolver, Int, Args, Mutation, Query } from "@nestjs/graphql";
import { SubmissionTake } from "./submission_take.entity";
import { SubmissionTakeService } from "./submission_take.service";
import { CreateSubmissionTakeInput } from "./dto/create_submission_take.input";

@Resolver(() => SubmissionTake)
export class SubmissionTakeResolver {
    constructor(private submissionTakeService: SubmissionTakeService){}

    @Query(() => [SubmissionTake])
    findAllSubmissionTakes(): Promise<SubmissionTake[]> {
        return this.submissionTakeService.findAllSubmissionTakes();
    }

    @Query(() => SubmissionTake)
    findOneSubmissionTake(
        @Args('id') id: number
        ): Promise<SubmissionTake> {
        return this.submissionTakeService.findOneSubmissionTake(id);
    }

    @Mutation(() => SubmissionTake)
    createSubmissionTake(
        @Args('createSubmissionTakeInput') createSubmissionTakeInput: CreateSubmissionTakeInput,
        @Args('submissionId', { type: () => Int }) submissionId: number
        ): Promise<SubmissionTake> {
        return this.submissionTakeService.createSubmissionTake(createSubmissionTakeInput, submissionId);
    }
}