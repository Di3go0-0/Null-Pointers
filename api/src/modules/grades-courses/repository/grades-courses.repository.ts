import { GetGradeType } from "../types/get.grades.type";
import { GradesType } from "../types/grades.type";
import { PatchGradesType } from "../types/patch.grades.type";
import { PostGradesType } from "../types/post.grades.type";

export abstract class GradeCourseRepository {
  abstract getGrade(params: GetGradeType): Promise<GradesType[]>;
  abstract postGrade(body: PostGradesType): Promise<number>;
  abstract patchGrade(id: number, body: PatchGradesType): Promise<number>;
  abstract existGradeCourse(id: number): Promise<void>;
  abstract existEnrollmentCourse(id: number): Promise<void>;
}
