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
        const result = [{ question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' }];

        jest.spyOn(service, 'getQuestions').mockImplementation(() => Promise.resolve(result));

        expect(await resolver.findQuestions(quiz_id)).toBe(result);
        expect(service.getQuestions).toHaveBeenCalledWith(quiz_id);
    });
});