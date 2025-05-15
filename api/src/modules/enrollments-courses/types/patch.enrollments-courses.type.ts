import { $Enums } from "@prisma/client";
import { PostEnrollmentsCoursesType } from "./post.enrollments-courses.type";

export type PatchEnrollmentsCoursesType = Partial<PostEnrollmentsCoursesType> & {
  status?: $Enums.CourseEnrollmentStatus;
}
