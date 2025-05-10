import { ApiProperty } from "@nestjs/swagger";
import { CourseInstanceStatus } from "generated/prisma";

export class GetByStatusCoursesInstancesDto {
  @ApiProperty({
    description: 'The status of the course instance',
    enum: CourseInstanceStatus,
    required: true,
    example: CourseInstanceStatus.Active
  })
  status: CourseInstanceStatus;
}
