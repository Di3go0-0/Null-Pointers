import { GetByStatusExtensionInstancesDto, PatchExtensionInstanceDto, PostExtensionInstanceDto } from "../dtos";
import { ExtesionInstanceType } from "../types/extension-instances.type";

export abstract class ExtensionInstancesRepository {
  abstract findExtensionCoursesInstances(): Promise<ExtesionInstanceType[]>;
  abstract findExtensionCoursesSearch(params: GetByStatusExtensionInstancesDto): Promise<ExtesionInstanceType[]>;
  abstract saveExtensionCourseInstance(body: PostExtensionInstanceDto): Promise<number>;
  abstract updateExtensionCourseInstance(id: number, body: PatchExtensionInstanceDto): Promise<number>;
  abstract deleteExtensionCourseInstance(id: number): Promise<number>;
  abstract existExtensionCourseInstance(courseId: number): Promise<boolean>;
  abstract existTeacher(teacherId: number): Promise<boolean>;
  abstract existExtensionCourse(courseId: number): Promise<boolean>;
  abstract verifyGroupCode(groupCode: string): Promise<boolean>;
  abstract verifyGroupCodeOwner(id: number, groupCode: string): Promise<boolean>;
}
