import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuestionInput {
 
  @Field()
  question: string;

  @Field()
  text: string;

  @Field()
  question_type: string;
}