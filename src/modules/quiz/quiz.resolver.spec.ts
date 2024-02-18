import { Test, TestingModule } from '@nestjs/testing';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';

describe('QuizResolver', () => {
    let resolver: QuizResolver;
    let service: QuizService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuizResolver,
                { provide: QuizService, useValue: { getQuestions: jest.fn() } },
            ],
        }).compile();

        resolver = module.get<QuizResolver>(QuizResolver);
        service = module.get<QuizService>(QuizService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should get questions', async () => {
        const quiz_id = 1;
        const result = [{
            id: 1,
            text: 'What is the capital of France?',
            questionType: 'multiple_choice',
            quiz: { id: quiz_id, name: 'Geography Quiz' },
            answers: [
                { id: 1, text: 'Paris', isCorrect: true },
                { id: 2, text: 'London', isCorrect: false },
                { id: 3, text: 'Berlin', isCorrect: false },
                { id: 4, text: 'Madrid', isCorrect: false }
            ],
            correctAnswer: { id: 1, text: 'Paris', isCorrect: true }
        }];

        jest.spyOn(service, 'getQuestions').mockImplementation(() => Promise.resolve(result));

        expect(await resolver.findQuestions(quiz_id)).toBe(result);
        expect(service.getQuestions).toHaveBeenCalledWith(quiz_id);
    });
});