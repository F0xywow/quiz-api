import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';
import { Submission } from './submission.entity';
import { CreateSubmissionInput } from './dto/create_submission.input';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionTakeService } from '../submission_take/submission_take.service';

describe('SubmissionResolver', () => {
  let resolver: SubmissionResolver;
  let service: SubmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmissionResolver,
        SubmissionService,
        { provide: getRepositoryToken(Submission), useClass: Repository },
        { provide: SubmissionTakeService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<SubmissionResolver>(SubmissionResolver);
    service = module.get<SubmissionService>(SubmissionService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should find all submissions', async () => {
    const result = [new Submission()];
    jest.spyOn(service, 'findAllSubmissions').mockImplementation(() => Promise.resolve(result));

    expect(await resolver.findAllSubmissions()).toBe(result);
  });

  it('should find one submission', async () => {
    const result = new Submission();
    jest.spyOn(service, 'findOneSubmission').mockImplementation(() => Promise.resolve(result));

    expect(await resolver.findOneSubmission(1)).toBe(result);
  });

  it('should create a submission', async () => {
    const result = new Submission();
    const createSubmissionInput: CreateSubmissionInput = {
      questionId: 1,
      submissionTakes: [
        {
          questionId: 1,
          textAnswers: ['Answer 1', 'Answer 2']
        }
      ]
    };
    jest.spyOn(service, 'createSubmission').mockImplementation(() => Promise.resolve(result));

    expect(await resolver.createSubmission(createSubmissionInput)).toBe(result);
  });

  it('should calculate points', async () => {
    const result = { maxPoints: 10, obtainedPoints: 5 };
    jest.spyOn(service, 'calculatePoints').mockImplementation(() => Promise.resolve(result));

    expect(await resolver.calculatePoints(1)).toBe(result);
  });
});