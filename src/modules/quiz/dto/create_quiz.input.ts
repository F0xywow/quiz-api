import { Field, InputType } from "@nestjs/graphql";
import { QuestionInput } from "../../question/dto/question.input";

@InputType()
export class createQuizInput {

    @Field()
    name: string;

    @Field(() => [QuestionInput])
    questions: QuestionInput[];

}