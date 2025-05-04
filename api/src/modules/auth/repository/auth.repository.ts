import { RoleName } from "generated/prisma";
import { RegisterType, UserType } from "../types";
import { ChangePassworType } from "../types/change-password.type";
import { ChangePasswordTokenType } from "../types/change-password-token";

export abstract class AuthRepository {
  abstract registerUser(body: RegisterType, roleId: number): Promise<number>;
  abstract existUser(email: string): Promise<UserType>;
  abstract getUserRol(email: string): Promise<string>;
  abstract searchRole(roleName: RoleName): Promise<number>;
  abstract chagePasswordWithOld(userId: number, body: ChangePassworType): Promise<number>;
  abstract requestPasswordToken(userId: number): Promise<string>;
  abstract changePasswordWithToken(userId: number, token: string, body: ChangePasswordTokenType): Promise<number>;
}
