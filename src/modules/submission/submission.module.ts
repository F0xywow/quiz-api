import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Submission } from "./submission.entity";
import { SubmissionService } from "./submission.service";
import { SubmissionResolver } from "./submission.resolver";
import { SubmissionTakeModule } from "../submission_take/submission_take.module";

@Module({
    imports: [TypeOrmModule.forFeature([Submission]), SubmissionTakeModule],
    providers: [SubmissionService, SubmissionResolver],
    exports: []
})
export class SubmissionModule {}