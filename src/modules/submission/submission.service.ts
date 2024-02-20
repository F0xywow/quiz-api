import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Submission } from "./submission.entity";
import { CreateSubmissionInput } from "./dto/create_submission.input";
import { SubmissionTakeService } from "../submission_take/submission_take.service";

@Injectable()
export class SubmissionService {
    constructor(@InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    private submissionTakeService: SubmissionTakeService,
    ){}

    async createSubmission(createSubmissionInput: CreateSubmissionInput){
        let submission = this.submissionRepository.create(createSubmissionInput);

        const savedSubmission = await this.submissionRepository.save(submission);

        for(const submissionTakeInput of createSubmissionInput.submissionTakes){
            const submissionTake = await this.submissionTakeService.createSubmissionTake(submissionTakeInput,submission.id);
            savedSubmission.submissionTakes.push(submissionTake);
        }
        
        return this.submissionRepository.save(submission);
    }

    findAllSubmissions(){
        return this.submissionRepository.find({relations: ['submissionTakes']});
    }

    findOneSubmission(id: number){
        return this.submissionRepository.findOne({where: {id: id},relations: ['submissionTakes']});
    }

    getSubmissionTakes(submission_id: number){
        return this.submissionTakeService.findAllSubmissionTakesBySubmission(submission_id);
    }

    async calculatePoints(submission_id: number){
        const submissionTakes = await this.getSubmissionTakes(submission_id);

        let maxPoints = submissionTakes.length;
        let obtainedPoints = 0;

        for (const submissionTake of submissionTakes) {
            if (submissionTake.isCorrect) {
                obtainedPoints += 1;
            }
        }

        return { maxPoints, obtainedPoints };
    }
}