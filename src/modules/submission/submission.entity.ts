import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { SubmittedAnswer } from "../submitted_answer/submitted_answer.entity";


@Entity()
export class Submission {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Quiz, (quiz) => quiz.submissions)
    quiz!: Quiz;
    
    @Column()
    student_id!: number;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    submitted_at!: Date;

    @OneToMany(() => SubmittedAnswer, submittedAnswer => submittedAnswer.submission)
    submittedAnswers!: SubmittedAnswer[];
}