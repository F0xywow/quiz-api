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
                { provide: QuizService, useValue: { 
                    getQuestions: jest.fn(),
                    findAllQuizzes: jest.fn(),
                    findOneQuiz: jest.fn(),
                    createQuiz: jest.fn(),
                } },
            ],
        }).compile();

        resolver = module.get<QuizResolver>(QuizResolver);
        service = module.get<QuizService>(QuizService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should create a quiz', async () => {
        const createQuizInput = { name: 'Sample Quiz', questions: [] };
        const mockQuiz = { id: 1, name: 'Sample Quiz', questions: [] };
        jest.spyOn(service, 'createQuiz').mockImplementation(() => Promise.resolve(mockQuiz));

        expect(await resolver.createQuiz(createQuizInput)).toBe(mockQuiz);
        expect(service.createQuiz).toHaveBeenCalledWith(createQuizInput);
    });

    it('should find all quizzes', async () => {
        const mockQuizzes = [{ id: 1, name: 'Sample Quiz', questions: [] }];
        jest.spyOn(service, 'findAllQuizzes').mockImplementation(() => Promise.resolve(mockQuizzes));

        expect(await resolver.findAllQuizzes()).toBe(mockQuizzes);
        expect(service.findAllQuizzes).toHaveBeenCalled();
    });

    it('should find one quiz', async () => {
        const id = 1;
        const mockQuiz = { id: 1, name: 'Sample Quiz', questions: [] };
        jest.spyOn(service, 'findOneQuiz').mockImplementation(() => Promise.resolve(mockQuiz));

        expect(await resolver.findOneQuiz(id)).toBe(mockQuiz);
        expect(service.findOneQuiz).toHaveBeenCalledWith(id);
    });
});