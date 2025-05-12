import { CourseInstanceStatus } from "@prisma/client";

export type CourseInstanceType = {
  id: number;
  courseId: number;
  teacherId: number;
  semester: string;
  groupCode: string;
  startDate: Date;
  endDate: Date;
  minStudents: number;
  maxStudents: number;
  status: CourseInstanceStatus;
}
