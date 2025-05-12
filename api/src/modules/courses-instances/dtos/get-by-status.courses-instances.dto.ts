import { ApiProperty } from "@nestjs/swagger";
import { CourseInstanceStatus } from "@prisma/client";
import { IsString } from "class-validator";

export class GetByStatusCoursesInstancesDto {
  @ApiProperty({
    description: 'The status of the course instance',
    enum: CourseInstanceStatus,
    required: true,
    example: CourseInstanceStatus.Active
  })
  @IsString()
  status: CourseInstanceStatus;
}
