import { RegisterType } from "../types";

export abstract class AuthRepository {
  abstract registerRequest(body: RegisterType): Promise<boolean>;
  abstract existUser(email: string): Promise<number>;
  abstract getUserRol(email: string): Promise<string>;
}
