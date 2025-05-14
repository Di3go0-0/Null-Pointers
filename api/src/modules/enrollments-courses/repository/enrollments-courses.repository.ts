import { EnrollmentsType, GetEnrollmentsCoursesType, PatchEnrollmentsCoursesType, PostEnrollmentsCoursesType } from "../types";

export abstract class EnrollmentsCoursesRepository {
  abstract find(): Promise<EnrollmentsType[]>;
  abstract findSearch(params: GetEnrollmentsCoursesType): Promise<EnrollmentsType[]>;
  abstract save(body: PostEnrollmentsCoursesType): Promise<number>;
  abstract update(id: number, body: PatchEnrollmentsCoursesType): Promise<number>;
  abstract existStudent(id: number): Promise<void>;
  abstract existCourseInstance(id: number): Promise<void>;
  abstract existEnrollmentAcademic(userId: number, CourseInstanceId: number): Promise<void>;
}
