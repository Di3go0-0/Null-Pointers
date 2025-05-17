import { RoleName } from "@prisma/client";
import { TeacherEntity } from "../entities";
import { PatchTeacherType } from "../types";
import { PostTeacherType } from "../types/post.teacher.type";

export abstract class TeachersRepository {
  abstract getTeacherById(id: number, roleId: number): Promise<TeacherEntity[]>;
  abstract getTeachers(roleId: number): Promise<TeacherEntity[]>;
  abstract saveTeacher(user: PostTeacherType): Promise<number>;
  abstract patchTeacher(userId: number, body: PatchTeacherType): Promise<number>;
  abstract searchRole(roleName: RoleName): Promise<number>;
  abstract userNew(email: string): Promise<void>;
  abstract existTeacher(userId: number): Promise<boolean>;
}
