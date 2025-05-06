import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PatchAcademicProgramDto {
  @ApiProperty({
    description: 'Name of the academic program',
    example: 'Computer Science',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Program name must be a string' })
  programName?: string;

  @ApiProperty({
    description: 'Unique code identifier for the program',
    example: 'CS-001',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Program code must be a string' })
  programCode?: string;

  @ApiProperty({
    description: 'Detailed description of the academic program',
    example: 'A comprehensive program covering software development, algorithms, and computer systems',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

