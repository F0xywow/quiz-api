import { Field, InputType, Int } from "@nestjs/graphql";
import { CreateSubmissionTakeInput } from "../../submission_take/dto/create_submission_take.input";

@InputType()
export class CreateSubmissionInput {

    @Field(type => Int)
    quizId: number;

    @Field(type => Int)
    userId: number;

    @Field(type => [CreateSubmissionTakeInput], {nullable: true})
    submissionTakes?: CreateSubmissionTakeInput[];
}