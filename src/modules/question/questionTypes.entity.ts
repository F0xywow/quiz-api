import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from '../answer/answer.entity';

@ObjectType()
@Entity()
export class SingleCorrectAnswerQuestion extends Question {
    @Field(() => [Answer])
    @OneToMany(() => Answer, answer => answer.question, {nullable: true})
    answers: Answer[];
}

@ObjectType()
@Entity()
export class MultipleCorrectAnswersQuestion extends Question {
    @Field(() => [Answer])
    @OneToMany(() => Answer, answer => answer.question, {nullable: true})
    answers: Answer[];
}

@ObjectType()
@Entity()
export class SortingQuestion extends Question {
    @Field(() => [Answer])
    @OneToMany(() => Answer, answer => answer.question, {nullable: true})
    answers: Answer[];
}

@ObjectType()
@Entity()
export class PlainTextAnswerQuestion extends Question {
    @Field(() => [Answer])
    @OneToMany(() => Answer, answer => answer.question, {nullable: true})
    answers: Answer[];
}