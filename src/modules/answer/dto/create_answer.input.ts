import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateAnswerInput{

    @Field()
    text!: string;

    @Field()
    isCorrect!: boolean;

    @Field(type => Int)
    questionId: number
}