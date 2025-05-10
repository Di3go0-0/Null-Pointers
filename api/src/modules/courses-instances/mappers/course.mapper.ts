import { CourseInstanceEntity } from "../entities";
import { CourseInstanceType } from "../types/courses-instances.type";



export class CourseInstanceMapper {
  /**
   * @mapperAcademicProgramEntity
   */
  public static toDomain(data: CourseInstanceEntity): CourseInstanceType {
    return {
      id: data.id,
      courseId: data.courseId,
      teacherId: data.teacherId,
      semester: data.semester,
      groupCode: data.groupCode,
      maxStudents: data.maxStudents,
      status: data.status,
    };
  }

  public static toDomainList(data: CourseInstanceEntity[]): CourseInstanceType[] {
    return data
      .map(this.toDomain);
  }
}

