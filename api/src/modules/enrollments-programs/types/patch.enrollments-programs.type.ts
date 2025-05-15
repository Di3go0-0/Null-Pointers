import { $Enums } from "@prisma/client";
import { PostEnrollmentsProgramsType } from "./post.enrollments-programs.type";

export type PatchEnrollmentsProgramsType = Partial<PostEnrollmentsProgramsType> & {
  status?: $Enums.ProgramEnrollmentStatus;
}
