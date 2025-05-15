import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsEnum } from 'class-validator';

export class PostEnrollmentsCoursesDto {
  @ApiProperty({
    description: 'The ID of the student',
    example: 1
  })
  @IsNumber()
  studentId: number;

  @ApiProperty({
    description: 'The ID of the course instance',
    example: 1
  })
  @IsNumber()
  courseInstanceId: number;

  @ApiProperty({
    description: 'The date when the student enrolled in the course',
    example: '2025-01-01T00:00:00Z'
  })
  @IsDate()
  enrollmentDate: Date;
}
