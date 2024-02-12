import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Question } from "../question/question.entity";
import { Submission } from "../submission/submission.entity";

@Entity()
export class SubmittedAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Question, (question) => question.submittedAnswers)
    question: Question;

    @ManyToOne(() => Submission, (submission) => submission.submittedAnswers)
    submission: Submission;
}