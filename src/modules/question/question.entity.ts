import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { Answer } from "../answer/answer.entity";
import { Field, ObjectType, Int, InputType } from "@nestjs/graphql";
import { QuestionType } from "./questionType.entity";

@ObjectType()
@Entity()
@InputType('QuestionInput')
export class Question{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    @Field()
    text!: string;

    @ManyToOne(() => QuestionType)
    @JoinColumn({name: 'questionTypeId'})
    @Field(() => QuestionType)
    questionType!: QuestionType;

    @Column()
    @Field(type => Int)
    questionTypeId!: number;

    @Column()
    @Field(type => Int)
    quizId?: number;

    @ManyToOne(() => Quiz, quiz => quiz.questions, {nullable: true})
    @Field(() => Quiz)
    quiz?: Quiz;

    @OneToMany(() => Answer, answer => answer.question, {nullable: true})
    @Field(() => [Answer])
    answers?: Answer[];

    @ManyToMany(() => Answer, {nullable: true})
    @JoinTable({name: "question_correct_answers"})
    @Field(() => [Answer], {nullable: true})
    correctAnswers?: Answer[];

    @Column({type: 'text', nullable: true})
    @Field({nullable: true})
    plainTextAnswer?: string;

    @Column({type: 'simple-array', nullable: true})
    @Field(type => [Int], {nullable: true})
    correctOrder?: number[];
}