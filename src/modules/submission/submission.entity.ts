import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { ObjectType, InputType, Field, Int } from "@nestjs/graphql";
import { Question } from "../question/question.entity";


@ObjectType()
@Entity()
@InputType('SubmissionInput')
export class Submission {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Field(type => Int)
    @Column()
    student_id!: number;

    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    submitted_at!: Date;

    @Field(type => Int)
    @Column()
    quiz_id!: number;

    @ManyToOne(type => Quiz, quiz => quiz.submissions)
    quiz!: Quiz;  

    @Field(type => [Int])
    @Column("int", { array: true} )
    question_ids!: number[];

    @Field(type => [Int])
    @Column("int", { array: true} )
    answer_ids!: number[];

    @Field(type => [String],{nullable: true})
    userAnswers?: string[];
}