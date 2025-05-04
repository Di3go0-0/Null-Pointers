import { TokenEntity, UserEntity } from "../entities";

export abstract class PasswordsRepository {
  abstract userExist(email: string): Promise<UserEntity>;
  abstract createToken(userId: number, token: string, expiresAt: Date): Promise<TokenEntity>;
  abstract passwordMatch(oldPassword: string, newPassword: string): Promise<void>;
  abstract changePassword(_userId: number, password: string): Promise<UserEntity>;
  abstract tokenExist(token: string, userId: number): Promise<TokenEntity>;
  abstract createPasswordHistory(userId: number, password: string): Promise<void>;
  abstract useToken(token: string): Promise<void>;
}
