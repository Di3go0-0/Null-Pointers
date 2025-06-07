import { RoleName } from "@prisma/client";
import { StudentEntity } from "../entities/student.entity";
import { RegisterType } from "src/modules/auth/types";
import { PatchStudentType } from "../types/patch.student.type";

export abstract class StudentsRepository {
  abstract getStudentById(id: number, roleId: number): Promise<StudentEntity[]>;
  abstract getStudents(roleId: number): Promise<StudentEntity[]>;
  abstract postStudent(body: RegisterType): Promise<number>;
  abstract searchRole(roleName: RoleName): Promise<number>;
  abstract existUser(email: string): Promise<boolean>;
  abstract existStudent(id: number): Promise<boolean>;
  abstract patchStudent(id: number, body: PatchStudentType): Promise<number>;
}
