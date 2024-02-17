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

    @Column({type: 'text'})
    @Field()
    text!: string;

    @Column()
    questionType!: string;

    @Column()
    @Field(type => Int, {nullable: true})
    quizId?: number;

    @ManyToOne(() => Quiz, quiz => quiz.questions, {nullable: true})
    @Field(() => Quiz)
    quiz?: Quiz;

    @OneToMany(() => Answer, answer => answer.question, {nullable: true})
    @Field(() => [Answer])
    answers?: Answer[];
    
}