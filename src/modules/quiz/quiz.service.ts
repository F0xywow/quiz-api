import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quiz } from "./quiz.entity";
import { Question } from "../question/question.entity";
import { Answer } from "../answer/answer.entity";

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>
    ) {}

    async createQuiz(
        name: string, 
        questions: string[], 
        answers: string[][]
        ): Promise<Quiz> {
            const quiz = new Quiz();
            quiz.title = name;

            const savedQuiz = await this.quizRepository.save(quiz);

            for (let i = 0; i < questions.length; i++) {
                const question = new Question();
                question.text = questions[i];
                question.quiz = savedQuiz;
                const savedQuestion = await this.questionRepository.save(question);

                for (let j = 0; j < answers[i].length; j++) {
                    const answer = new Answer();
                    answer.text = answers[i][j];
                    answer.question = savedQuestion;
                    await this.answerRepository.save(answer);
                }
            }

            return savedQuiz;
        }

       /* async getQuestions(
            quizId: number
            ): Promise<Question[]> {
                return this.questionRepository.find({
                    where: {
                        : quizId
                    }
                });
            }

            async checkAnswers(
                quizId: number,
                answers: string[]
                ): Promise<QuizResult> {
                    const questions = await this.questionRepository.find({
                        where: {
                            quiz: quizId
                        },
                        relations: ['answers']
                    });

                    let correct = 0;
                    let total = 0;

                    for (let i = 0; i < questions.length; i++) {
                        const question = questions[i];
                        const correctAnswer = question.answers.find(a => a.isCorrect);
                        const userAnswer = answers[i];

                        if (correctAnswer.text === userAnswer) {
                            correct++;
                        }

                        total++;
                    }

                    return {
                        correct,
                        total
                    };
                }*/
            }