import { EnrollmentsProgramsType, PatchEnrollmentsProgramsType, PostEnrollmentsProgramsType } from "../types";
import { GetEnrollmentsProgramsType } from "../types/get.enrollments-programs.type";

export abstract class EnrollmentsProgramsRepository {
  abstract find(): Promise<EnrollmentsProgramsType[]>;
  abstract findSearch(params: GetEnrollmentsProgramsType): Promise<EnrollmentsProgramsType[]>;
  abstract save(body: PostEnrollmentsProgramsType): Promise<number>;
  abstract update(id: number, body: PatchEnrollmentsProgramsType): Promise<number>;
  abstract studentAlreadyEnrollment(studentId: number, academicProgramId: number): Promise<void>;
  abstract existStudent(id: number): Promise<void>;
  abstract existAcademicProgram(id: number): Promise<void>;
}
