import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Question } from "../question/question.entity";


@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text'})
    text!: string;

    @Column()
    isCorrect!: boolean;

    @ManyToOne(() => Question, question => question.answers)
    question!: Question;
}
