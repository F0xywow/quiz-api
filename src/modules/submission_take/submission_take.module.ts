import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubmissionTake } from "./submission_take.entity";
import { SubmissionTakeService } from "./submission_take.service";
import { SubmissionTakeResolver } from "./submission_take.resolver";
import { QuestionModule } from "../question/question.module";
import { AnswerModule } from "../answer/answer.module";

@Module({
    imports: [TypeOrmModule.forFeature([SubmissionTake]), QuestionModule, AnswerModule],
    providers: [SubmissionTakeService, SubmissionTakeResolver],
    exports: [SubmissionTakeService]
})
export class SubmissionTakeModule {}