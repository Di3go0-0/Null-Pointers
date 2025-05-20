import { $Enums } from "@prisma/client";

export type EnrollmentsEntity = {
  id: number;
  status: $Enums.ExtensionEnrollmentStatus;
  studentId: number;
  extensionCourseInstanceId: number;
  enrollmentDate: Date;
}
