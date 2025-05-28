import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PostEnrollmentsExtensionDto } from "./post.enrollments-courses";
import { $Enums } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class PatchEnrollmentsCoursesDto extends PartialType(PostEnrollmentsExtensionDto) {
  @ApiProperty({
    description: 'The current status of the enrollment',
    enum: $Enums.ExtensionEnrollmentStatus,
    example: $Enums.ExtensionEnrollmentStatus.Enrolled,
    required: false
  })
  @IsOptional()
  @IsEnum($Enums.ExtensionEnrollmentStatus)
  status?: $Enums.ExtensionEnrollmentStatus;
}
