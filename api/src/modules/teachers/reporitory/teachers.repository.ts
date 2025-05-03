import { TeacherEntity } from "../entities";
import { PatchTeacherType } from "../types";
import { PostTeacherType } from "../types/post.teacher.type";

export abstract class TeachersRepository {
  abstract getTeachers(): Promise<TeacherEntity[]>;
  abstract postTeacher(userId: number, body: PostTeacherType): Promise<number>;
  abstract patchTeacher(userId: number, body: PatchTeacherType): Promise<number>;
}
