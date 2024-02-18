import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionResolver } from './submission.resolver';
import { SubmissionService } from './submission.service';
import { PointsResult } from './submission.resolver';

describe('SubmissionResolver', () => {
    let resolver: SubmissionResolver;
    let service: SubmissionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SubmissionResolver,
                { provide: SubmissionService, useValue: { calculatePoints: jest.fn() } },
            ],
        }).compile();

        resolver = module.get<SubmissionResolver>(SubmissionResolver);
        service = module.get<SubmissionService>(SubmissionService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('should calculate points', async () => {
        const result: PointsResult = { maxPoints: 10, obtainedPoints: 5 };
        const submission_id = 1;

        jest.spyOn(service, 'calculatePoints').mockImplementation(() => Promise.resolve(result));

        expect(await resolver.calculatePoints(submission_id)).toBe(result);
        expect(service.calculatePoints).toHaveBeenCalledWith(submission_id);
    });
});