import { CourseInstanceStatus } from "generated/prisma";

export type CourseInstanceEntity = {
  id: number;
  courseId: number;
  teacherId: number;
  semester: string;
  groupCode: string;
  maxStudents: number;
  status: CourseInstanceStatus;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

