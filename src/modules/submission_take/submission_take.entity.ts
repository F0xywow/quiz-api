import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Submission } from "../submission/submission.entity";
import { Question } from "../question/question.entity";

@ObjectType()
@Entity()
export class SubmissionTake{
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field(type => Int)
    submissionId: number;

    @ManyToOne(() => Submission, submission => submission.submissionTakes, {onDelete: 'CASCADE'})
    @Field(() => Submission)
    submission!: Submission;

    @Column()
    @Field(type => Int)
    questionId: number;

    @ManyToOne(() => Question, question => question.submissionTakes, {onDelete: 'CASCADE'})
    @Field(() => Question)
    question!: Question;

    @Column({type: 'text', nullable: true})
    @Field(type => [String],{nullable: true})
    textAnswers?: string[];

    @Column({nullable: true})
    @Field()
    isCorrect?: boolean;

    @Column({type: 'int', array: true, nullable: true})
    @Field(type => [Int], {nullable: true})
    orderAnswers?: number[];
}