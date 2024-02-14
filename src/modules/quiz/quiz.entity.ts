import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../question/question.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Submission } from '../submission/submission.entity';

@ObjectType()
@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  name!: string;

  @OneToMany(() => Question, (question) => question.quiz)
  questions!: Question[];

  @OneToMany(() => Submission, (submission) => submission.quiz)
  submissions!: Submission[];

}