import { CourseInstanceStatus } from "@prisma/client";

export type GetByStatusCoursesInstancesType = {
  id?: number,
  teacherId?: number;
  courseId?: number;
  semester?: string;
  status?: CourseInstanceStatus;
}
