import { CourseInstanceStatus } from "@prisma/client";
import { PostCourseInstanceType } from "./post.courses-instances.type";

export type PatchCourseInstanceType = Partial<PostCourseInstanceType> & {
  status?: CourseInstanceStatus;
}

