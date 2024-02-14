import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { Answer } from "../answer/answer.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({type: 'text'})
    text!: string;

    @Column()
    questionType!: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz!: Quiz;

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[];
    
}