import { PartialType } from "@nestjs/swagger";
import { PostScheduleCourseInstanceDto } from "./post.schedules-courses-instances.dto";

export class PatchScheduleDto extends PartialType(PostScheduleCourseInstanceDto) {
}
