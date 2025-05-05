import { RoleName } from "generated/prisma";
import { StudentEntity } from "../entities/student.entity";

export abstract class StudentsRepository {
  abstract getStudentById(id: number, roleId: number): Promise<StudentEntity[]>;
  abstract getStudents(roleId: number): Promise<StudentEntity[]>;
  abstract postStudent(userId: number): Promise<number>;
  abstract searchRole(roleName: RoleName): Promise<number>;
  abstract existUser(userId: number): Promise<boolean>;
  abstract updateUserRol(userId: number, roleId: number): Promise<boolean>;
  abstract existStudent(userId: number): Promise<boolean>;
}
