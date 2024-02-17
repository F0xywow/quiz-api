import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Submission } from "./submission.entity";
import { SubmissionService } from "./submission.service";
import { SubmissionResolver } from "./submission.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Submission])],
    providers: [SubmissionService, SubmissionResolver],
    exports: []
})

export class SubmissionModule {}