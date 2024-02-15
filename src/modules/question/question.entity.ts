import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { Answer } from "../answer/answer.entity";
import { Field, ObjectType, Int, InputType } from "@nestjs/graphql";

@ObjectType()
@Entity()
@InputType('QuestionInput')
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({type: 'text'})
    text!: string;

    @Column()
    questionType!: string;

    @Column()
    @Field(type => Int, {nullable: true})
    quizId!: number;

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    @Field(() => Quiz)
    quiz: Quiz;

    @Column()
    @Field(type => Int, {nullable: true})
    answerId!: number;

    @OneToMany(() => Answer, answer => answer.question)
    @Field(() => [Answer])
    answers: Answer[];
    
}