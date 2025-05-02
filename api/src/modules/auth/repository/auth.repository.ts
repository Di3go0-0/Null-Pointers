import { RoleName } from "generated/prisma";
import { PatchPersonalInfoType, PostPersonalInfoType, RegisterType } from "../types";

export abstract class AuthRepository {
  abstract registerUser(body: RegisterType, roleId: number): Promise<number>;
  abstract postPersonalInfo(userId: number, body: PostPersonalInfoType): Promise<number>;
  abstract patchPersonalInfo(userId: number, body: PatchPersonalInfoType): Promise<number>;
  abstract existUser(email: string): Promise<number>;
  abstract getUserRol(email: string): Promise<string>;
  abstract searchRole(roleName: RoleName): Promise<number>;
}
