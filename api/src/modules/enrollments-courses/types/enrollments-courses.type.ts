import { $Enums } from "@prisma/client";

export type EnrollmentsType = {
  id: number;
  status: $Enums.CourseEnrollmentStatus;
  studentId: number;
  courseInstanceId: number;
  enrollmentDate: Date;
  semester: string;
}
