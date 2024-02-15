import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Submission } from "../submission/submission.entity";
import { Question } from "../question/question.entity";


@Entity()
export class SubmittedAnswer {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Submission, (submission) => submission.submittedAnswers)
    submission!: Submission;

    @ManyToOne(() => Question, (question) => question.answers)
    question!: Question;

    @Column({type: 'text', nullable: true})
    text!: string;

}