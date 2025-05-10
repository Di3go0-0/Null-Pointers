import { CourseInstanceStatus } from "generated/prisma";
import { PostCourseInstanceType } from "./post.courses-instances.type";

export type PatchCourseInstanceType = Partial<PostCourseInstanceType> & {
  status?: CourseInstanceStatus;
}

