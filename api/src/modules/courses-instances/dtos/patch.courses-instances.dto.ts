import { PartialType } from "@nestjs/swagger";
import { PostCourseInstanceDto } from "./post.courses-instances.dto";
import { ApiProperty } from "@nestjs/swagger";
import { CourseInstanceStatus } from "@prisma/client";

export class PatchCourseInstanceDto extends PartialType(PostCourseInstanceDto) {
  @ApiProperty({
    description: 'The status of the course instance',
    enum: CourseInstanceStatus,
    required: false,
    example: CourseInstanceStatus.Active
  })
  status?: CourseInstanceStatus;
}

