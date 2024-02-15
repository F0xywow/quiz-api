import { Field, InputType, Int } from '@nestjs/graphql';
import { Quiz } from 'src/modules/quiz/quiz.entity';
import { Answer } from 'src/modules/answer/answer.entity';

@InputType()
export class CreateQuestionInput {

  @Field()
  text!: string;

  @Field(type => String, {nullable: true})
  questionType!: string;

  @Field(type => Int, {nullable: true})
  quizId: number;

  @Field(type => Int, {nullable: true})
  answerId?: number;

}

