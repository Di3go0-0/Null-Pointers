import { CourseInstanceStatus } from "@prisma/client";

export type CourseInstanceEntity = {
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
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}

