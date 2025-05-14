import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PostEnrollmentsCoursesDto } from "./post.enrollments-courses";

export class GetEnrollmentsCoursesDto extends PartialType(PostEnrollmentsCoursesDto) {
  @ApiProperty({
    description: 'The semester when this course instance takes place (e.g. "2025-1")',
    example: '2025-1',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  semester?: string;
}
