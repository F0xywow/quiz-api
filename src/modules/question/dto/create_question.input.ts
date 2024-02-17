import { Field, InputType, Int } from '@nestjs/graphql';
import { Answer } from 'src/modules/answer/answer.entity';

@InputType()
export class CreateQuestionInput {

  @Field(type => String)
  text!: string;

  @Field(type => String, {nullable: true})
  questionType!: string;

  @Field(type => [Answer])
  answers!: Answer[];

}

