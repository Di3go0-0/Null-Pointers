import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsString } from "class-validator";

export class GetGradeDto {
  @ApiPropertyOptional({
    description: 'The unique ID of the grade.',
    example: 123,
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiPropertyOptional({
    description: 'The ID of the course enrollment related to this grade.',
    example: 45,
  })
  @IsOptional()
  @IsNumber()
  extensionCourseEnrollmentId?: number;

  @ApiPropertyOptional({
    description: 'The ID of the student.',
    example: 789,
  })
  @IsOptional()
  @IsNumber()
  studentId?: number;

  @ApiPropertyOptional({
    description: 'The ID of the extension course instance.',
    example: 101,
  })
  @IsOptional()
  @IsNumber()
  extensionCourseInstanceId?: number;
}
