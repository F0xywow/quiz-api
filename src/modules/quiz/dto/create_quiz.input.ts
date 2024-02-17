import { Field, InputType } from "@nestjs/graphql";
import { CreateQuestionInput } from "../../question/dto/create_question.input";

@InputType()
export class CreateQuizInput {

    @Field(type => String)
    name: string;

    @Field(type => [CreateQuestionInput])
    questions: CreateQuestionInput[];
}