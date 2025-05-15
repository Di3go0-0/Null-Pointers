import { EnrollmentsProgramsEntity } from "../entities";
import { EnrollmentsProgramsType } from "../types";

export class EnrollmentsMapper {
  /**
   * @mapper
   */
  public static toDomain(data: EnrollmentsProgramsEntity): EnrollmentsProgramsType {
    return {
      id: data.id,
      academicProgramId: data.academicProgramId,
      academicProgramName: data.academicProgram.programName,
      studentId: data.studentId,
      studentName: data.student.user.name,
      enrollmentDate: data.enrollmentDate,
      status: data.status,
    };
  }

  public static toDomainList(data: EnrollmentsProgramsEntity[]): EnrollmentsProgramsType[] {
    return data
      .map(this.toDomain);
  }
}
