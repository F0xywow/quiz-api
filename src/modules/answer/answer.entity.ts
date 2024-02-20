import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Question } from "../question/question.entity";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    @Field()
    id!: number;

    @Column({type: 'text'})
    @Field()
    text!: string;

    @Column()
    @Field()
    isCorrect!: boolean;

    @Column()
    @Field(type => Int)
    questionId?: number

    @ManyToOne(() => Question, question => question.answers)
    @Field(type => Question)
    question?: Question;
}
