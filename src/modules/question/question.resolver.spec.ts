import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { CreateQuestionInput } from './dto/create_question.input';
import { CreateAnswerInput } from '../answer/dto/create_answer.input';

describe('QuestionResolver', () => {
  let resolver: QuestionResolver;
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionResolver,
        {
          provide: QuestionService,
          useValue: {
            findOneQuestion: jest.fn(),
            findAllQuestions: jest.fn(),
            createQuestion: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find one question', async () => {
    const result = new Question();
    jest.spyOn(service, 'findOneQuestion').mockResolvedValue(result);
    expect(await resolver.findOneQuestion(1)).toBe(result);
  });

  it('should find all questions', async () => {
    const result = [new Question(), new Question()];
    jest.spyOn(service, 'findAllQuestions').mockResolvedValue(result);
    expect(await resolver.findAllQuestions()).toBe(result);
  });

  it('should create a question', async () => {
    const result = new Question();
    const input: CreateQuestionInput = {
      text: 'Sample Question',
      questionType: 'singleAnswer',
      answers: [
        { text: 'Option 1', isCorrect: true } as CreateAnswerInput,
        { text: 'Option 2', isCorrect: false } as CreateAnswerInput,
        { text: 'Option 3', isCorrect: false } as CreateAnswerInput,
        { text: 'Option 4', isCorrect: false } as CreateAnswerInput,
      ],
    };
    jest.spyOn(service, 'createQuestion').mockResolvedValue(result);
    expect(await resolver.createQuestion(input, 1)).toBe(result);
  });
});