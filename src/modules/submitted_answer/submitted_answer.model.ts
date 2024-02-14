import { Column, Entity, ManyToOne } from "typeorm";
import { Submission } from "../submission/submission.model";
import { Question } from "../question/question.model";


@Entity()
export class SubmittedAnswer {

    @ManyToOne(() => Submission, (submission) => submission.submittedAnswers)
    submission!: Submission;

    @ManyToOne(() => Question, (question) => question.answers)
    question!: Question;

    @Column({type: 'text', nullable: true})
    text!: string;

}
