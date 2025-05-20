import { ApiProperty, PartialType } from "@nestjs/swagger";
import { PostScheduleDto } from "./post.schedules-courses-instances.dto";
import { IsNumber, IsOptional } from "class-validator";

export class GetScheduleDto extends PartialType(PostScheduleDto) {
  @ApiProperty({
    description: 'The ID of the schedules course instance',
    example: 1,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  id?: number;
}
