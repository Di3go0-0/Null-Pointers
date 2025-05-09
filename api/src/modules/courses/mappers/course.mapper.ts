import { CourseEntity } from "../entities";
import { CourseType } from "../types";



export class CourseMapper {
  /**
   * @mapperAcademicProgramEntity
   */
  public static toDomain(data: CourseEntity): CourseType {
    return {
      id: data.id,
      programId: data.programId,
      courseName: data.courseName,
      courseCode: data.courseCode,
      description: data.description,
      credits: data.credits,
    };
  }

  public static toDomainList(data: CourseEntity[]): CourseType[] {
    return data
      .map(this.toDomain);
  }
}

