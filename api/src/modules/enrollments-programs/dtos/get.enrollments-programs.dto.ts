import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsNumber, IsDate, IsEnum, IsOptional } from "class-validator";

export class GetEnrollmentsProgramsDto {
  @ApiProperty({
    description: "The ID of the academic program enrollment",
    example: 1,
    required: false,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    description: "The ID of the academic program",
    example: 1,
    required: false,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  academicProgramId?: number;

  @ApiProperty({
    description: "The ID of the student",
    example: 1,
    required: false,
    type: Number
  })
  @IsOptional()
  @IsNumber()
  studentId?: number;

  @ApiProperty({
    description: "The date when the student enrolled in the program",
    example: "2024-01-01T00:00:00.000Z",
    required: false,
    type: Date
  })
  @IsOptional()
  @IsDate()
  enrollmentDate?: Date;

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

