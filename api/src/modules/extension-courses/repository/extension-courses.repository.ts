import { ExtensionCourseType, PatchExtensionCousrsesType, PostExtensionCoursesType } from "../types";


export abstract class ExtensionCoursesRepository {
  abstract findExtensionCourseByAcademicProgram(programId: number): Promise<ExtensionCourseType[]>;
  abstract findExtensionCourses(): Promise<ExtensionCourseType[]>;
  abstract findExtensionCourseById(id: number): Promise<ExtensionCourseType[]>;
  abstract saveExtensionCourse(body: PostExtensionCoursesType): Promise<number>;
  abstract updateExtensionCourse(id: number, body: PatchExtensionCousrsesType): Promise<number>;
  abstract deleteExtensionCourse(id: number): Promise<number>;
  abstract validateExtensionCourseCode(programCode: string): Promise<boolean>;
  abstract validateAcademicProgram(academicId: number): Promise<boolean>;
  abstract validateExtensionCourseCodeOwner(id: number, programCode: string): Promise<boolean>;
  abstract existExtensionCourse(id: number): Promise<boolean>;
}
