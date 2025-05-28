import { PartialType } from "@nestjs/swagger";
import { PostEnrollmentsExtensionDto } from "./post.enrollments-courses";

export class GetEnrollmentsCoursesDto extends PartialType(PostEnrollmentsExtensionDto) {

}
