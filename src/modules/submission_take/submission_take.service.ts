import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubmissionTake } from "./submission_take.entity";
import { CreateSubmissionTakeInput } from "./dto/create_submission_take.input";
import { QuestionService } from "../question/question.service";
import { AnswerService } from "../answer/answer.service";

@Injectable()
export class SubmissionTakeService {
    constructor(
        @InjectRepository(SubmissionTake)
        private submissionTakeRepository: Repository<SubmissionTake>,
        private answerService: AnswerService,
        private questionService: QuestionService
    ){}

    async createSubmissionTake(createSubmissionTakeInput: CreateSubmissionTakeInput, submissionId: number): Promise<SubmissionTake> {
        const submissionTake = new SubmissionTake();
        const question = await this.questionService.findOneQuestion(createSubmissionTakeInput.questionId);
        const correctAnswers = await this.answerService.findCorrectAnswers(createSubmissionTakeInput.questionId);

        if (question.questionType === 'sorting') {
            submissionTake.isCorrect = createSubmissionTakeInput.orderAnswers.every((answerOrder, index) =>
                question.correctOrder[index] === answerOrder
            );
        } else {
            submissionTake.isCorrect = createSubmissionTakeInput.textAnswers.length === correctAnswers.length &&
                createSubmissionTakeInput.textAnswers.every(answer =>
                    correctAnswers.some(correctAnswer => correctAnswer.text.toLowerCase() === answer.toLowerCase())
                );
        }

        submissionTake.question = question;
        submissionTake.textAnswers = createSubmissionTakeInput.textAnswers;
        submissionTake.orderAnswers = createSubmissionTakeInput.orderAnswers;
        submissionTake.submissionId = submissionId;

        return this.submissionTakeRepository.save(submissionTake);
    }

    findAllSubmissionTakes(): Promise<SubmissionTake[]> {
        return this.submissionTakeRepository.find();
    }

    findOneSubmissionTake(id: number): Promise<SubmissionTake> {
        return this.submissionTakeRepository.findOne({where: {id: id}});
    }

    findAllSubmissionTakesBySubmission(submission_id: number): Promise<SubmissionTake[]> {
        return this.submissionTakeRepository.find({where: {submissionId: submission_id}});
    }

}