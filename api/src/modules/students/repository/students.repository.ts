import { RoleName } from "@prisma/client";
import { StudentEntity } from "../entities/student.entity";
import { RegisterType } from "src/modules/auth/types";

export abstract class StudentsRepository {
  abstract getStudentById(id: number, roleId: number): Promise<StudentEntity[]>;
  abstract getStudents(roleId: number): Promise<StudentEntity[]>;
  abstract postStudent(body: RegisterType): Promise<number>;
  abstract searchRole(roleName: RoleName): Promise<number>;
  abstract existUser(email: string): Promise<boolean>;
}
