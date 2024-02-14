import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../question/question.model';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Submission } from '../submission/submission.model';

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