import { $Enums } from "@prisma/client";

export type PostEnrollmentsCoursesType = {
  studentId: number;
  courseInstanceId: number;
  enrollmentDate: Date;
  status: $Enums.CourseEnrollmentStatus;
}
