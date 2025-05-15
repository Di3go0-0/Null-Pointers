import { $Enums } from "@prisma/client";

export type GetEnrollmentsProgramsType = {
  id?: number;
  academicProgramId?: number;
  studentId?: number;
  enrollmentDate?: Date;
  status?: $Enums.ProgramEnrollmentStatus;
}
