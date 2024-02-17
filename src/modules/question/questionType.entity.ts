import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class QuestionType {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    @Field()
    questionType: string;
}