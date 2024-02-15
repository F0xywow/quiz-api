import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Question } from "../question/question.entity";
import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
@InputType('AnswerInput')
export class Answer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text'})
    @Field()
    text!: string;

    @Column()
    @Field()
    isCorrect!: boolean;

    @ManyToOne(() => Question, question => question.answers)
    @Field(type => Question)
    question!: Question;
}
