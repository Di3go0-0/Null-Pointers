import { $Enums } from "@prisma/client";

export type EnrollmentsType = {
  id: number;
  status: $Enums.ExtensionEnrollmentStatus;
  studentId: number;
  extensionCourseInstanceId: number;
  enrollmentDate: Date;
}
