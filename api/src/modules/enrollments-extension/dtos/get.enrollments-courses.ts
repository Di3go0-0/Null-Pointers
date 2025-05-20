import { PartialType } from "@nestjs/swagger";
import { PostEnrollmentsCoursesDto } from "./post.enrollments-courses";

export class GetEnrollmentsCoursesDto extends PartialType(PostEnrollmentsCoursesDto) {

}
