import { RoleName } from "generated/prisma";
import { TeacherEntity } from "../entities";
import { PatchTeacherType } from "../types";
import { PostTeacherType } from "../types/post.teacher.type";

export abstract class TeachersRepository {
  abstract getTeacherById(id: number, roleId: number): Promise<TeacherEntity[]>;
  abstract getTeachers(roleId: number): Promise<TeacherEntity[]>;
  abstract postTeacher(userId: number, body: PostTeacherType): Promise<number>;
  abstract patchTeacher(userId: number, body: PatchTeacherType): Promise<number>;
  abstract searchRole(roleName: RoleName): Promise<number>;
  abstract existUser(userId: number): Promise<boolean>;
  abstract updateUserRol(userId: number, rolId: number): Promise<boolean>;
  abstract existTeacher(userId: number): Promise<boolean>;
}
