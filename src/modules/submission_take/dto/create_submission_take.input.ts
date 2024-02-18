import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateSubmissionTakeInput {

  @Field(type => Int)
  questionId: number;

  @Field(type => [String], {nullable: true})
  textAnswers?: string[];

  @Field(type => [Int], {nullable: true})
  orderAnswers?: number[];
}