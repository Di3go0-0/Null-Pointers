import { $Enums } from "@prisma/client";

export type EnrollmentsEntity = {
  id: number;
  status: $Enums.CourseEnrollmentStatus;
  studentId: number;
  courseInstanceId: number;
  enrollmentDate: Date;
  courseInstance: {
    semester: string;
  };
}
