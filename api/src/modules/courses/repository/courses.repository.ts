import { CourseType, PatchCousrsesType, PostCoursesType } from "../types";


export abstract class CoursesRepository {
  abstract findCourseByAcademicProgram(programId: number): Promise<CourseType[]>;
  abstract findCourses(): Promise<CourseType[]>;
  abstract findCourseById(id: number): Promise<CourseType[]>;
  abstract saveCourse(body: PostCoursesType): Promise<number>;
  abstract updateCourse(id: number, body: PatchCousrsesType): Promise<number>;
  abstract deleteCourse(id: number): Promise<number>;
  abstract validateCourseCode(programCode: string): Promise<boolean>;
  abstract validateAcademicProgram(academicId: number): Promise<boolean>;
  abstract validateCourseCodeOwner(id: number, programCode: string): Promise<boolean>;
  abstract existCourse(id: number): Promise<boolean>;
}
