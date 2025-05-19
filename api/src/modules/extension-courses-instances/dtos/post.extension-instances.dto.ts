import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class PostExtensionInstanceDto {
  @ApiProperty({
    description: 'The ID of the extension course',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  extensionCourseId: number;

  @ApiProperty({
    description: 'The ID of the teacher assigned to this course instance',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNumber()
  teacherId: number;

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
    description: 'Maximum number of students allowed in this course instance',
    example: 30,
    required: true,
    type: Number,
  })
  @IsNumber()
  maxStudents: number;
}

