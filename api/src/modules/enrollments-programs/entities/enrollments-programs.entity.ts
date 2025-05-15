import { $Enums } from "@prisma/client";

export type EnrollmentsProgramsEntity = {
  id: number;
  studentId: number;
  academicProgramId: number;
  enrollmentDate: Date;
  status: $Enums.ProgramEnrollmentStatus;
  student: {
    user: {
      name: string;
    };
  };
  academicProgram: {
    programName: string;
  };
}
