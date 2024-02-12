import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { SubmittedAnswer } from "../submitted-answer/submitted-answer.entity";

@Entity()
export class Submission{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Quiz, (quiz) => quiz.submissions)
    quiz: Quiz;

    @OneToMany(() => SubmittedAnswer, (submittedAnswer) => submittedAnswer.submission)
    submittedAnswers: SubmittedAnswer[];
}