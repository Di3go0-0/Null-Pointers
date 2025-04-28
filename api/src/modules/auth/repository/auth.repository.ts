import { RegisterType } from "../types";

export abstract class AuthRepository {
  abstract registerStudentRequest(body: RegisterType): Promise<boolean>;
  abstract registerTeacherRequest(body: RegisterType): Promise<boolean>;
  abstract existUser(email: string): Promise<number>;
  abstract getUserRol(email: string): Promise<string>;
}
