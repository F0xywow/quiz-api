import { Mutation, Resolver, Query, Args, ObjectType, Field, Int } from "@nestjs/graphql";
import { Submission } from "./submission.entity";
import { SubmissionService } from "./submission.service";
import { CreateSubmissionInput } from "./dto/create_submission.input";

@ObjectType()
export class PointsResult {
    @Field(() => Int)
    maxPoints: number;

    @Field(() => Int)
    obtainedPoints: number;
}

@Resolver(() => Submission)
export class SubmissionResolver {
    constructor(private SubmissionService: SubmissionService){}

    @Query(() => [Submission])
    findAllSubmissions(){
        return this.SubmissionService.findAllSubmissions();
    }

    @Query(() => Submission)
    findOneSubmission(id: number){
        return this.SubmissionService.findOneSubmission(id);
    }

    @Mutation(() => Submission)
    createSubmission(
        @Args('createSubmissionInput') createSubmissionInput: CreateSubmissionInput
        ){
        return this.SubmissionService.createSubmission(createSubmissionInput);
    }

    @Query(() => PointsResult)
    async calculatePoints(
        @Args('submission_id', { type: () => Int }) submission_id: number
        ): Promise<PointsResult>{
        return this.SubmissionService.calculatePoints(submission_id);
    }
}
