import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../question/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Submission } from '../submission/submission.entity';

@ObjectType()
@Entity()
@InputType('QuizInput')
export class Quiz {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id!: number;

  @Column()
  @Field()
  name!: string;
  
  @OneToMany(() => Question, (question) => question.quiz)
  @Field(type => [Question], {nullable: true})
  questions?: Question[];

  @OneToMany(() => Submission, (submission) => submission.quiz)
  @Field(type => [Submission], {nullable: true})
  submissions?: Submission[];

}