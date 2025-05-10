import { CourseInstanceStatus } from "@prisma/client";

export type CourseInstanceType = {
  id: number;
  courseId: number;
  teacherId: number;
  semester: string;
  groupCode: string;
  maxStudents: number;
  status: CourseInstanceStatus;
}
