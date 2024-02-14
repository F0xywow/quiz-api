import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "../quiz/quiz.model";
import { Answer } from "../answer/answer.model";
import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    text!: string;

    @Column()
    questionType!: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz!: Quiz;

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[];
    
}