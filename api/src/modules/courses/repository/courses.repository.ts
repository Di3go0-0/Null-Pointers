import { CourseEntity } from "../entities";
import { PatchCousrsesType, PostCoursesType } from "../types";


export abstract class CoursesRepository {
  abstract findCourseByAcademicProgram(programId: number): Promise<CourseEntity[]>;
  abstract findCourses(): Promise<CourseEntity[]>;
  abstract findCourseById(id: number): Promise<CourseEntity[]>;
  abstract saveCourse(body: PostCoursesType): Promise<number>;
  abstract updateCourse(id: number, body: PatchCousrsesType): Promise<number>;
  abstract deleteCourse(id: number): Promise<number>;
  abstract validateCourseCode(programCode: string): Promise<boolean>;
  abstract validateAcademicProgram(academicId: number): Promise<boolean>;
  abstract validateCourseCodeOwner(id: number, programCode: string): Promise<boolean>;
  abstract existCourse(id: number): Promise<boolean>;
}
