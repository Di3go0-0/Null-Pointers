import { PartialType } from "@nestjs/swagger";
import { PostScheduleDto } from "./post.schedules-courses-instances.dto";

export class PatchScheduleDto extends PartialType(PostScheduleDto) {
}
