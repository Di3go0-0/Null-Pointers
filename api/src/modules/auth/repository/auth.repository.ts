import { RoleName } from "generated/prisma";
import { RegisterType } from "../types";

export abstract class AuthRepository {
  abstract registerUser(body: RegisterType, roleId: number): Promise<number>;
  abstract existUser(email: string): Promise<number>;
  abstract getUserRol(email: string): Promise<string>;
  abstract searchRole(roleName: RoleName): Promise<number>;
}
