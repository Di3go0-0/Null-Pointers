import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PostGradesDto {
  @ApiProperty({
    description: 'The ID of the enrollment course',
    example: 1,
    type: Number,
  })
  @IsNumber()
  enrollmentCourseId: number;
}

