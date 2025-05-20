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
      extensionCourseInstanceId: data.extensionCourseInstanceId,
      enrollmentDate: data.enrollmentDate,
    };
  }

  public static toDomainList(data: EnrollmentsEntity[]): EnrollmentsType[] {
    return data
      .map(this.toDomain);
  }
}
