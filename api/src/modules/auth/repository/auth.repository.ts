import { RegisterType } from "../types";

export abstract class AuthRepository {
  abstract registerStudentRequest(body: RegisterType): Promise<number>;
  abstract registerTeacherRequest(body: RegisterType): Promise<number>;
  abstract existUser(email: string): Promise<number>;
  abstract getUserRol(email: string): Promise<string>;
}
