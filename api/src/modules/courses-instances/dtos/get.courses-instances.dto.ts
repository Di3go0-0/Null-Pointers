import { ApiProperty } from "@nestjs/swagger";
import { CourseInstanceStatus } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetByStatusCoursesInstancesDto {

  @ApiProperty({
    description: 'The id of the course instance',
    example: 1,
    required: false
  })
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The teacher id associated with the course instance',
    example: 123,
    required: false
  })
  @IsOptional()
  @IsNumber()
  teacherId: number;

  @ApiProperty({
    description: 'The course id associated with this instance',
    example: 456,
    required: false
  })
  @IsOptional()
  @IsNumber()
  courseId: number;

  @ApiProperty({
    description: 'The semester of the instance',
    required: false,
    example: '2025-1'
  })
  @IsString()
  @IsOptional()
  semester: string;

  @ApiProperty({
    description: 'The status of the course instance',
    enum: CourseInstanceStatus,
    required: false,
    example: CourseInstanceStatus.Active
  })
  @IsString()
  @IsOptional()
  status: CourseInstanceStatus;
}
