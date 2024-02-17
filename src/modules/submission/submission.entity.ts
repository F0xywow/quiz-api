import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "../quiz/quiz.entity";
import { ObjectType, InputType, Field, Int } from "@nestjs/graphql";


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

}