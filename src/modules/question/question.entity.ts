import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { Answer } from "../answer/answer.entity";
import { Field, ObjectType, Int, InputType } from "@nestjs/graphql";
import { text } from "stream/consumers";
import { stringify } from "querystring";

@ObjectType()
@Entity()
@InputType('QuestionInput')
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    @Field()
    text!: string;

    @Column({type: 'text'})
    @Field({nullable: true})
    questionType: string;

    @Column()
    @Field(type => Int)
    quizId?: number;

    @ManyToOne(() => Quiz, quiz => quiz.questions, {nullable: true})
    @Field(() => Quiz)
    quiz?: Quiz;

    @OneToMany(() => Answer, answer => answer.question, {nullable: true})
    @Field(() => [Answer])
    answers?: Answer[];

    @Column(() => text)
    @Field(() => [String], {nullable: true})
    correctAnswers?: string[];

    @Column({type: 'text', nullable: true})
    @Field({nullable: true})
    plainTextAnswer?: string;

    @Column({type: 'simple-array', nullable: true})
    @Field(type => [Int], {nullable: true})
    correctOrder?: number[];
}