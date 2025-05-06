import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostAcademicProgramDto {
  @ApiProperty({
    description: 'Name of the academic program',
    example: 'Computer Science',
    required: true,
  })
  @IsNotEmpty({ message: 'Program name is required' })
  @IsString({ message: 'Program name must be a string' })
  programName: string;

  @ApiProperty({
    description: 'Unique code identifier for the program',
    example: 'CS-001',
    required: true,
  })
  @IsNotEmpty({ message: 'Program code is required' })
  @IsString({ message: 'Program code must be a string' })
  programCode: string;

  @ApiProperty({
    description: 'Detailed description of the academic program',
    example: 'A comprehensive program covering software development, algorithms, and computer systems',
    required: true,
  })
  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  description: string;
}

