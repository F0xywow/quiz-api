import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>
    ) {}

    async getQuestions(quizId: number): Promise<Question[]> {
        return this.questionRepository.find({
            where: {
                quiz: { id: quizId }
            }
        });
    }
}