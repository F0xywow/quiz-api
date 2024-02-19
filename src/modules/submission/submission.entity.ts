import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { SubmissionTake } from "../submission_take/submission_take.entity";
import { Quiz } from "../quiz/quiz.entity";

@ObjectType()
@Entity()
export class Submission{
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @OneToMany(() => SubmissionTake, submissionTake => submissionTake.submission)
    @Field(() => [SubmissionTake])
    submissionTakes: SubmissionTake[];

    @Column()
    @Field(type => Int)
    userId: number;

    @Column()
    @Field(type => Int)
    quizId: number;

    @ManyToOne(() => Quiz, quiz => quiz.submissions)
    @Field(() => Quiz)
    quiz: Quiz;
}