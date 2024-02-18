import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { Answer } from "../answer/answer.entity";
import { Field, ObjectType, Int, InputType } from "@nestjs/graphql";
import { SubmissionTake } from "../submission_take/submission_take.entity";

@ObjectType()
@Entity()
export class Question{
    @PrimaryGeneratedColumn()
    @Field()
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

    @ManyToOne(() => Quiz, quiz => quiz.questions, {onDelete: 'CASCADE'})
    @Field(() => Quiz)
    quiz!: Quiz;

    @OneToMany(() => Answer, answer => answer.question)
    @Field(() => [Answer])
    answers!: Answer[];

    @Column({type: 'simple-array', nullable: true})
    @Field(type => [Int], {nullable: true})
    correctOrder?: number[];

    @OneToMany(() => SubmissionTake, submissionTake => submissionTake.question)
    @Field(() => [SubmissionTake])
    submissionTakes?: SubmissionTake[];
}