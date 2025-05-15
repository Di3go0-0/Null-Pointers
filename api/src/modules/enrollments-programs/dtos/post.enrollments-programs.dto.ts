import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsDate } from "class-validator";

export class PostEnrollmentsProgramsDto {
  @ApiProperty({
    description: "The ID of the academic program",
    example: 1,
    type: Number
  })
  @IsNumber()
  academicProgramId: number;

  @ApiProperty({
    description: "The ID of the student",
    example: 1,
    type: Number
  })
  @IsNumber()
  studentId: number;

  @ApiProperty({
    description: "The date when the student enrolled in the program",
    example: "2024-01-01T00:00:00.000Z",
    type: Date
  })
  @IsDate()
  enrollmentDate: Date;
}

