import { GradesType } from "../types/grades.type";



export class GradeMapper {
  /**
   * @mapper
   */
  public static toDomain(data: any): GradesType {
    return {
      id: data.id,
      enrollmentCourseId: data.enrollmentCourseId,
      studentId: data.enrollmentCourse.studentId,
      courseInstanceId: data.enrollmentCourse.courseInstanceId,
      semester: data.enrollmentCourse.courseInstance.semester,
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

