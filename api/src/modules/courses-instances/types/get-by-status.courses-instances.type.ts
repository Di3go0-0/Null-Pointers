import { CourseInstanceStatus } from "@prisma/client";

export type GetByStatusCoursesInstancesType = {
  status: CourseInstanceStatus;
}
