import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class PostCourseInstanceDto {
  @ApiProperty({
    description: 'The ID of the course',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  courseId: number;

  @ApiProperty({
    description: 'The ID of the teacher assigned to this course instance',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  teacherId: number;

  @ApiProperty({
    description: 'The semester when this course instance takes place (e.g. "2025-1")',
    example: '2025-1',
    required: true,
    type: String,
  })
  @IsString()
  semester: string;

  @ApiProperty({
    description: 'The unique group code for this course instance',
    example: 'A1',
    required: true,
    type: String,
  })
  @IsString()
  groupCode: string;

  @ApiProperty({
    description: 'Start date of the course instance',
    example: '2025-01-01',
    required: true,
    type: Date,
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the course instance',
    example: '2025-06-30',
    required: true,
    type: Date,
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Minimum number of students required for the course instance',
    example: 1,
    required: true,
    type: Number,
    default: 1,
  })
  @IsNumber()
  minStudents: number;

  @ApiProperty({
    description: 'Maximum number of students allowed in this course instance',
    example: 30,
    required: true,
    type: Number,
  })
  @IsNumber()
  maxStudents: number;


}

