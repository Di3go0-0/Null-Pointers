import { ApiProperty } from '@nestjs/swagger';

export class PostCourseInstanceDto {
  @ApiProperty({
    description: 'The ID of the course',
    example: 1,
    type: Number,
  })
  courseId: number;

  @ApiProperty({
    description: 'The ID of the teacher assigned to this course instance',
    example: 1,
    type: Number,
  })
  teacherId: number;

  @ApiProperty({
    description: 'The semester when this course instance takes place (e.g. "2025-1")',
    example: '2025-1',
    type: String,
  })
  semester: string;

  @ApiProperty({
    description: 'The unique group code for this course instance',
    example: 'A1',
    type: String,
  })
  groupCode: string;

  @ApiProperty({
    description: 'Maximum number of students allowed in this course instance',
    example: 30,
    type: Number,
  })
  maxStudents: number;
}

