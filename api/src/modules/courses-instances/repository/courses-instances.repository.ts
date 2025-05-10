import { GetByStatusCoursesInstancesType, PatchCourseInstanceType, PostCourseInstanceType } from "../types";
import { CourseInstanceType } from "../types/courses-instances.type";

export abstract class CoursesInstancesRepository {
  abstract findCoursesInstances(): Promise<CourseInstanceType[]>;
  abstract findCoursesByStatus({ status }: GetByStatusCoursesInstancesType): Promise<CourseInstanceType[]>;
  abstract findCoursesByTeacher(teacherId: number): Promise<CourseInstanceType[]>;
  abstract findCoursesByCourseId(courseId: number): Promise<CourseInstanceType[]>;
  abstract findCoursesById(id: number): Promise<CourseInstanceType[]>;
  abstract saveCourseInstance(body: PostCourseInstanceType): Promise<number>;
  abstract updateCourseInstance(id: number, body: PatchCourseInstanceType): Promise<number>;
  abstract deleteCourseInstance(id: number): Promise<number>;
  abstract existCourseInstance(courseId: number): Promise<boolean>;
  abstract existTeacher(teacherId: number): Promise<boolean>;
  abstract existCourse(courseId: number): Promise<boolean>;
  abstract verifyGroupCode(groupCode: string, semester: string): Promise<boolean>;
  abstract verifyGroupCodeOwner(courseId: number, groupCode: string): Promise<boolean>;
}
