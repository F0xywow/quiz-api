import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateSubmissionInput {
    @Field(type => Int)
    student_id!: number;

    @Field(type => Int)
    quiz_id!: number;

    @Field(type => [Int])
    question_number!: number[];

    @Field(type => [Int])
    answer_number!: number[];
}