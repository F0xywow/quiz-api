import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { Quiz } from "./quiz.entity";
import { Question } from "../question/question.entity";
import { QuestionInput } from "../question/question.input";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Quiz)
export class QuizResolver {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
    ) {}

    @Mutation(() => Quiz)
    async createQuiz( 
        @Args('quizName') quizName: string,
        @Args('questions', {type: () => [QuestionInput]}) questions: QuestionInput[]
    ): Promise<Quiz> {
        const quiz = new Quiz();
        quiz.name = quizName;
        await this.quizRepository.save(quiz);
                                
        for (const questionInput of questions) {
            const question = new Question();
            question.text = questionInput.text;
            question.questionType = questionInput.question_type;
            question.quiz = quiz;
            await this.questionRepository.save(question);
        }

        return quiz;
    }

    @Query(() => [Question])
    async getQuestions(
        @Args('quizId', { type: () => Int }) quizId: number
    ): Promise<Question[]> {
        return this.questionRepository.find({ where: { quiz: { id: quizId } } });
    }

    @Query(() => [Quiz])
    async getQuizzes(): Promise<Quiz[]> {
        return this.quizRepository.find();
    }
}