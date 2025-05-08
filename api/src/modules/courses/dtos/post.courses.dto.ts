import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Max, MinLength, MaxLength } from 'class-validator';

export class PostCoursesDto {

  @ApiProperty({
    description: 'The program ID that this course belongs to',
    example: 1,
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  programId: number;

  @ApiProperty({
    description: 'The name of the course',
    example: 'Introduction to Programming',
    minLength: 3,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  courseName: string;

  @ApiProperty({
    description: 'Unique code identifier for the course',
    example: 'CS101',
    minLength: 3,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  courseCode: string;

  @ApiProperty({
    description: 'Detailed description of the course content and objectives',
    example: 'Learn the fundamentals of programming including variables, control structures, and basic algorithms',
    minLength: 10,
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: 'Number of credits assigned to this course',
    example: 3,
    minimum: 1,
    maximum: 12
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(12)
  credits: number;
}
