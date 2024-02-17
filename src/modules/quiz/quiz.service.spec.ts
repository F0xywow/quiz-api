import { Test, TestingModule } from '@nestjs/testing';
import { QuizService } from './quiz.service';
import { Quiz } from './quiz.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('QuizService', () => {
    let service: QuizService;

    // Mock quiz data
    const mockQuizData = [
        new Quiz(),
        new Quiz(),
    ];

    // Mock repository
    const mockRepository = {
        find: jest.fn().mockResolvedValue(mockQuizData),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuizService,
                {
                    provide: getRepositoryToken(Quiz),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<QuizService>(QuizService);
    });

    it('should be able to find all quizzes', async () => {
        const quizzes = await service.findAll();
        expect(quizzes).toBe(mockQuizData);
        expect(mockRepository.find).toHaveBeenCalled();
    });
});