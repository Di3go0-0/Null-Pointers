import { $Enums } from "@prisma/client";

export type EnrollmentsProgramsType = {
  id: number;
  academicProgramId: number;
  academicProgramName: string;
  studentId: number;
  studentName: string;
  enrollmentDate: Date;
  status: $Enums.ProgramEnrollmentStatus;
}
