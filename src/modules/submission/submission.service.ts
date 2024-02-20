import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Submission } from "./submission.entity";
import { CreateSubmissionInput } from "./dto/create_submission.input";
import { SubmissionTakeService } from "../submission_take/submission_take.service";

// Define the SubmissionService
@Injectable()
export class SubmissionService {
    // Inject necessary services and repositories in the constructor
    constructor(
        @InjectRepository(Submission)
        private submissionRepository: Repository<Submission>,
        private submissionTakeService: SubmissionTakeService,
    ){}

    // Method to create a new Submission
    async createSubmission(createSubmissionInput: CreateSubmissionInput){
        // Create a new Submission
        let submission = this.submissionRepository.create(createSubmissionInput);

        // Save the new Submission in the repository
        const savedSubmission = await this.submissionRepository.save(submission);

        // For each submissionTakeInput, create a new SubmissionTake and add it to the Submission
        for(const submissionTakeInput of createSubmissionInput.submissionTakes){
            const submissionTake = await this.submissionTakeService.createSubmissionTake(submissionTakeInput,submission.id);
            savedSubmission.submissionTakes.push(submissionTake);
        }
        
        // Save the updated Submission in the repository
        return this.submissionRepository.save(submission);
    }

    // Method to find all Submissions
    findAllSubmissions(){
        return this.submissionRepository.find({relations: ['submissionTakes']});
    }

    // Method to find a single Submission by id
    findOneSubmission(id: number){
        return this.submissionRepository.findOne({where: {id: id},relations: ['submissionTakes']});
    }

    // Method to find all SubmissionTakes for a specific submission
    getSubmissionTakes(submission_id: number){
        return this.submissionTakeService.findAllSubmissionTakesBySubmission(submission_id);
    }

    // Method to calculate the points for a specific submission
    async calculatePoints(submission_id: number){
        // Get all SubmissionTakes for the submission
        const submissionTakes = await this.getSubmissionTakes(submission_id);

        // Initialize the maximum and obtained points
        let maxPoints = submissionTakes.length;
        let obtainedPoints = 0;

        // For each SubmissionTake, if it is correct, increment the obtained points
        for (const submissionTake of submissionTakes) {
            if (submissionTake.isCorrect) {
                obtainedPoints += 1;
            }
        }

        // Return the maximum and obtained points
        return { maxPoints, obtainedPoints };
    }
}