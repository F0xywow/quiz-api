import { Field, InputType } from "@nestjs/graphql";
import { Question } from "src/modules/question/question.entity";
import { Submission } from "src/modules/submission/submission.entity";

@InputType()
export class createQuizInput {

    @Field(type => String)
    name: string;

    @Field(type => [Question])
    questions: Question[];
}