import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from './question.model';
import { Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Quiz {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.quiz;
  questions: Question[];
}