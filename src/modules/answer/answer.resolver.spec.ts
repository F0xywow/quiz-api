import { Test, TestingModule } from '@nestjs/testing';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';


describe('AnswerResolver', () => {
    let resolver: AnswerResolver;
    let service: AnswerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AnswerResolver,
                {
                    provide: AnswerService,
                    useValue: {
                        findOneAnswer: jest.fn(),
                        findAllAnswers: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        resolver = module.get<AnswerResolver>(AnswerResolver);
        service = module.get<AnswerService>(AnswerService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    describe('findOneAnswer', () => {
        it('should return one answer', async () => {
            const result = { id: 1,questionId:1, text: 'Mock answer 1', isCorrect: true };
            jest.spyOn(service, 'findOneAnswer').mockImplementation(() => Promise.resolve(result));

            expect(await resolver.findOneAnswer(1)).toBe(result);
        });
    });

    describe('findAllAnswers', () => {
        it('should return an array of answers', async () => {
            const result = [
                { id: 1,questionId:1, text: 'Mock answer 1', isCorrect: true },
                { id: 2,questionId:1, text: 'Mock answer 2', isCorrect: false }
            ];
            jest.spyOn(service, 'findAllAnswers').mockImplementation(() => Promise.resolve(result));

            expect(await resolver.findAllAnswers()).toBe(result);
        });
    });

    describe('createAnswer', () => {
        it('should create a new answer', async () => {
            const input = { text: 'New mock answer', isCorrect: true };
            const questionId = 1;
            const result = { id: 3, questionId: questionId, text: 'New mock answer', isCorrect: true };
            jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(result));

            expect(await resolver.createAnswer(input, questionId)).toBe(result);
        });
    });
});