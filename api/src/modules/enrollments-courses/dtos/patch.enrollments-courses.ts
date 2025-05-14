import { PartialType } from "@nestjs/swagger";
import { PostEnrollmentsCoursesDto } from "./post.enrollments-courses";

export class PatchEnrollmentsCoursesDto extends PartialType(PostEnrollmentsCoursesDto) { }
