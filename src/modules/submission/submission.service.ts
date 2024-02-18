import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Submission } from "./submission.entity";
import { Repository } from "typeorm";
import { CreateSubmissionInput } from "./dto/create_submission.input";
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

    isAnswerCorrect(correctAnswers: string[], userAnswers: string[]): boolean {
        const normalize = (str: string) => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();

        const normalizedCorrectAnswers = correctAnswers.map(normalize);
        const normalizedUserAnswers = userAnswers.map(normalize);

        for (const answer of normalizedUserAnswers) {
            if (!normalizedCorrectAnswers.includes(answer)) {
                return false;
            }
        }
        return true;
    }

    async calculateResult(submissionId: number): Promise<{ totalPoints: number; obtainedPoints: number }> {
        let totalPoints = 0;
        let obtainedPoints = 0;

        const submission = await this.findOneSubmission(submissionId);

        // Check if submission and submission.userAnswers are not null or undefined
        if (submission && submission.userAnswers) {
            for(let i = 0; i < submission.userAnswers.length; i++){
                const question = await this.questionService.findOneQuestion(submission.question_ids[i]);
                const submittedAnswers = submission.userAnswers[i];

                totalPoints ++;

                if(question && question.answers){
                    const correctAnswers = question.answers.filter(answer => answer.isCorrect);
                    switch(question.questionType) {
                        case 'singleAnswer':
                            if(correctAnswers.some(answer => answer.text === submittedAnswers)){
                                obtainedPoints++;
                            }
                            break;
                        case 'multipleAnswers':
                            let isCorrect = true;
                            for (const answer of submittedAnswers) {
                                if (!correctAnswers.some(correctAnswer => correctAnswer.text === answer)) {
                                    isCorrect = false;
                                    break;
                                }
                            }
                            if (isCorrect) {
                                obtainedPoints++;
                            }
                            break;
                        case 'sorting':
                            if(JSON.stringify(correctAnswers.map(answer => answer.text)) === JSON.stringify(submittedAnswers)){
                                obtainedPoints++;
                            }
                            break;
                        case 'plainTextAnswer':
                            if(correctAnswers.some(answer => answer.text.toLowerCase() === submittedAnswers.toLowerCase())){
                                obtainedPoints++;
                            }
                            break;
                    }
                }
            }
        }

        return {totalPoints, obtainedPoints};
    }
    
}