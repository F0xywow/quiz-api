import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateAnswerInput{

    @Field(type => String)
    text!: string;

    @Field(type => Boolean)
    isCorrect!: boolean;
}