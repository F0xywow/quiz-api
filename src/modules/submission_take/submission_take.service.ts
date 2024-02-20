import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubmissionTake } from "./submission_take.entity";
import { CreateSubmissionTakeInput } from "./dto/create_submission_take.input";
import { QuestionService } from "../question/question.service";
import { AnswerService } from "../answer/answer.service";

// Define the SubmissionTakeService
@Injectable()
export class SubmissionTakeService {
    // Inject necessary services and repositories in the constructor
    constructor(
        @InjectRepository(SubmissionTake)
        private submissionTakeRepository: Repository<SubmissionTake>,
        private answerService: AnswerService,
        private questionService: QuestionService
    ){}

    // Method to create a new SubmissionTake
    async createSubmissionTake(createSubmissionTakeInput: CreateSubmissionTakeInput, submissionId: number): Promise<SubmissionTake> {
        const submissionTake = new SubmissionTake();
        const question = await this.questionService.findOneQuestion(createSubmissionTakeInput.questionId);
        const correctAnswers = await this.answerService.findCorrectAnswers(createSubmissionTakeInput.questionId);

        // Check if the submission is correct based on the question type
        if (question.questionType === 'sorting') {
            submissionTake.isCorrect = createSubmissionTakeInput.orderAnswers.every((answerOrder, index) =>
                question.correctOrder[index] === answerOrder
            );
        } else if (question.questionType === 'singleAnswer' || question.questionType === 'plainTextAnswer') {
            submissionTake.isCorrect = createSubmissionTakeInput.textAnswers.length === 1 &&
                correctAnswers.some(correctAnswer => correctAnswer.text.toLowerCase() === createSubmissionTakeInput.textAnswers[0].toLowerCase());
        } else if (question.questionType === 'multipleAnswers') {
            submissionTake.isCorrect = createSubmissionTakeInput.textAnswers.length === correctAnswers.length &&
                createSubmissionTakeInput.textAnswers.every(answer =>
                    correctAnswers.some(correctAnswer => correctAnswer.text.toLowerCase() === answer.toLowerCase())
                );
        } else {
            submissionTake.isCorrect = false;
        }

        // Set the properties of the new SubmissionTake
        submissionTake.question = question;
        submissionTake.textAnswers = createSubmissionTakeInput.textAnswers;
        submissionTake.orderAnswers = createSubmissionTakeInput.orderAnswers;
        submissionTake.submissionId = submissionId;

        // Save the new SubmissionTake in the repository
        return this.submissionTakeRepository.save(submissionTake);
    }

    // Method to find all SubmissionTakes
    findAllSubmissionTakes(): Promise<SubmissionTake[]> {
        return this.submissionTakeRepository.find();
    }

    // Method to find a single SubmissionTake by id
    findOneSubmissionTake(id: number): Promise<SubmissionTake> {
        return this.submissionTakeRepository.findOne({where: {id: id}});
    }

    // Method to find all SubmissionTakes for a specific submission
    findAllSubmissionTakesBySubmission(submission_id: number): Promise<SubmissionTake[]> {
        return this.submissionTakeRepository.find({where: {submissionId: submission_id}});
    }
}