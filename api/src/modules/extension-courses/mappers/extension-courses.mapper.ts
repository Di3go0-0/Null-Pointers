import { ExtensionCourseEntity } from "../entities";
import { ExtensionCourseType } from "../types";

export class ExtensionCourseMapper {
  /**
   * @mapperAcademicProgramEntity
   */
  public static toDomain(data: ExtensionCourseEntity): ExtensionCourseType {
    return {
      id: data.id,
      programId: data.programId,
      courseName: data.courseName,
      courseCode: data.courseCode,
      description: data.description,
      durationHours: data.durationHours,
    };
  }

  public static toDomainList(data: ExtensionCourseEntity[]): ExtensionCourseType[] {
    return data
      .map(this.toDomain);
  }
}

