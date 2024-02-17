import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Submission } from "./submission.entity";
import { Repository } from "typeorm";
import { CreateSubmissionInput } from "./dto/create_submission.input";
import { Quiz } from "../quiz/quiz.entity";

@Injectable()
export class SubmissionService {
    constructor(
    @InjectRepository(Submission) private submissionRepository: Repository<Submission>,
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
    ){}

    create(createSubmissionInput: CreateSubmissionInput): Promise<Submission> {
        const submission = this.submissionRepository.create(createSubmissionInput);

        return this.submissionRepository.save(submission);
    }

    findAllSubmissions(): Promise<Submission[]>{
        return this.submissionRepository.find();
    }

    findOneSubmission(id: number): Promise<Submission> {
        return this.submissionRepository.findOne({where: {id: id}});
    }

    

}