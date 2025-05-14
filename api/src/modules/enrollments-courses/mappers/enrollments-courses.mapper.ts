import { EnrollmentsEntity } from "../entities";
import { EnrollmentsType } from "../types";

export class EnrollmentsMapper {
  /**
   * @mapper
   */
  public static toDomain(data: EnrollmentsEntity): EnrollmentsType {
    return {
      id: data.id,
      status: data.status,
      studentId: data.studentId,
      courseInstanceId: data.courseInstanceId,
      enrollmentDate: data.enrollmentDate,
      semester: data.courseInstance.semester,
    };
  }

  public static toDomainList(data: EnrollmentsEntity[]): EnrollmentsType[] {
    return data
      .map(this.toDomain);
  }
}
