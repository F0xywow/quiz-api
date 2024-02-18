import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Question } from '../question/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Submission } from '../submission/submission.entity';

@ObjectType()
@Entity()
@InputType('QuizInput')
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  name!: string;
  
  @OneToMany(() => Question, (question) => question.quiz, {nullable: true})
  @Field(type => [Question])
  questions?: Question[];
 
  @OneToMany(() => Submission, (submission) => submission.quiz, {nullable: true})
  @Field(type => [Submission])
  submissions?: Submission[];
}