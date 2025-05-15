import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PostEnrollmentsCoursesDto } from "./post.enrollments-courses";
import { $Enums } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class PatchEnrollmentsCoursesDto extends PartialType(PostEnrollmentsCoursesDto) {
  @ApiProperty({
    description: 'The current status of the enrollment',
    enum: $Enums.CourseEnrollmentStatus,
    example: $Enums.CourseEnrollmentStatus.Failed,
    required: false
  })
  @IsOptional()
  @IsEnum($Enums.CourseEnrollmentStatus)
  status?: $Enums.CourseEnrollmentStatus;
}
