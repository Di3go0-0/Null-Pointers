import { GradesType } from "../types/grades.type";



export class GradeMapper {
  /**
   * @mapper
   */
  public static toDomain(data: any): GradesType {
    return {
      id: data.id,
      extensionCourseEnrollmentId: data.extensionCourseEnrollmentId,
      studentId: data.extensionCourseEnrollment.studentId,
      extensionCourseInstanceId: data.extensionCourseEnrollment.extensionCourseInstanceId,
      term1_grade: data.term1_grade,
      term2_grade: data.term2_grade,
      term3_grade: data.term3_grade,
      final: data.final,
    };
  }

  public static toDomainList(data: any[]): GradesType[] {
    return data
      .map(this.toDomain);
  }
}

