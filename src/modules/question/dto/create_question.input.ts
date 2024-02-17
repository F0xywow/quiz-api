import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateAnswerInput } from '../../answer/dto/create_answer.input';

@InputType()
export class CreateQuestionInput {

  @Field(type => String)
  text!: string;

  @Field(type => String, {nullable: true})
  questionType!: string;

  @Field(type => [CreateAnswerInput])
  answers!: CreateAnswerInput[];

}

