import { Field, InputType, Int } from '@nestjs/graphql';
import { Quiz } from 'src/modules/quiz/quiz.entity';
import { Answer } from 'src/modules/answer/answer.entity';

@InputType()
export class CreateQuestionInput {

  @Field()
  id: number;

  @Field()
  text!: string;

  @Field()
  questionType!: string;

  @Field(type => Int)
  quizId!: number;

  @Field(type => Int)
  answerId!: number;

}

