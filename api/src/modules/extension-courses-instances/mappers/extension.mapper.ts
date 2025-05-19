import { ExtensionInstanceEntity } from "../entities";
import { ExtesionInstanceType } from "../types/extension-instances.type";



export class ExtensionInstanceMapper {
  /**
   * @mapper
   */
  public static toDomain(data: ExtensionInstanceEntity): ExtesionInstanceType {
    return {
      id: data.id,
      extensionCourseId: data.extensionCourseId,
      teacherId: data.teacherId,
      groupCode: data.groupCode,
      startDate: data.startDate,
      endDate: data.endDate,
      maxStudents: data.maxStudents,
      publicationStatus: data.publicationStatus,
    };
  }

  public static toDomainList(data: ExtensionInstanceEntity[]): ExtesionInstanceType[] {
    return data
      .map(this.toDomain);
  }
}

