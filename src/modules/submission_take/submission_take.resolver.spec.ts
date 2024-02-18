import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionTakeResolver } from './submission_take.resolver';
import { SubmissionTakeService } from './submission_take.service';
import { SubmissionTake } from './submission_take.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerService } from '../answer/answer.service';
import { QuestionService } from '../question/question.service';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/answer.entity';

describe('SubmissionTakeResolver', () => {
  let resolver: SubmissionTakeResolver;
  let service: SubmissionTakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionTakeResolver,
        SubmissionTakeService,
        AnswerService,
        QuestionService,
        { provide: getRepositoryToken(SubmissionTake), useClass: Repository },
        { provide: getRepositoryToken(Question), useClass: Repository },
        { provide: getRepositoryToken(Answer), useClass: Repository },
      ],
    }).compile();

    resolver = module.get<SubmissionTakeResolver>(SubmissionTakeResolver);
    service = module.get<SubmissionTakeService>(SubmissionTakeService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find one submission take', async () => {
    const result = new SubmissionTake();
    jest.spyOn(service, 'findOneSubmissionTake').mockImplementation(() => Promise.resolve(result));

    expect(await resolver.findOneSubmissionTake(1)).toBe(result);
  });
});