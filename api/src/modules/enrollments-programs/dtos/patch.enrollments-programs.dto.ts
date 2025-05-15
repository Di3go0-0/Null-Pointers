import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { PostEnrollmentsProgramsDto } from "./post.enrollments-programs.dto";
import { $Enums } from "@prisma/client";

export class PatchEnrollmentsProgramsDto extends PartialType(PostEnrollmentsProgramsDto) {
  @ApiProperty({
    description: "The status of the program enrollment",
    enum: $Enums.ProgramEnrollmentStatus,
    example: $Enums.ProgramEnrollmentStatus.Inactive,
    required: false
  })
  @IsEnum($Enums.ProgramEnrollmentStatus)
  @IsOptional()
  status?: $Enums.ProgramEnrollmentStatus;
}

