import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Submission } from "./submission.entity";
import { Repository } from "typeorm";
import { CreateSubmissionInput } from "./dto/create_submission.input";
import { Answer } from "../answer/answer.entity";
import { QuestionService } from "../question/question.service";

@Injectable()
export class SubmissionService {
    constructor(
    @InjectRepository(Submission) private submissionRepository: Repository<Submission>,
    private questionService: QuestionService,
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

    async calculateResult(submissionId: number){
        let totalPoints = 0;
        let obtainedPoints = 0;

        const submission = await this.findOneSubmission(submissionId);

        for(let i = 0; i < submission.question_ids.length; i++){
            const question = await this.questionService.findOneQuestion(submission.question_ids[i]);
            const submittedAnswer = submission.userAnswers[i];

            totalPoints ++;

            if(question.questionType === 'multiple-choice'){
                for (const correctAnswer of question.correctAnswers) {
                    if(this.isAnswerCorrect(correctAnswer, submittedAnswer)){
                        obtainedPoints++;
                        break;
                    }
                }
            }
        }
    

        return {totalPoints, obtainedPoints};
    }

    isAnswerCorrect(correctAnswer: string, submittedAnswer: string){
        const normalize = (str: string) => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
        return normalize(correctAnswer) === normalize(submittedAnswer);
    }
}
