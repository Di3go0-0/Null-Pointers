import { UserEntity } from "../entities";
import { RegisterType } from "../types";

export abstract class AuthRepository {
  abstract registerUser(body: RegisterType): Promise<number>;
  abstract getUserByEmail(email: string): Promise<UserEntity>;
}
