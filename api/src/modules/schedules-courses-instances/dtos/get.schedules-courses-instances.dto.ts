import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PostScheduleCourseInstanceDto } from "./post.schedules-courses-instances.dto";
import { IsOptional, IsString } from "class-validator";

export class GetScheduleDto extends PartialType(PostScheduleCourseInstanceDto) {
  @ApiProperty({
    description: 'The semester when this course instance takes place (e.g. "2025-1")',
    example: '2025-1',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  semester: string;
}
