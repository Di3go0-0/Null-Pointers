import { Injectable } from '@nestjs/common';
import { PasswordsRepository } from './repository';
import { ChangePasswordTokenType, ChangePassworType } from './types';
import { generateResetToken } from './helpers';
import { hashpassword } from '../auth/helpers';

@Injectable()
export class PasswordsService {
  constructor(private readonly passwordsRepository: PasswordsRepository) { }

  async requestPasswordToken(email: string): Promise<boolean> {
    const user = await this.passwordsRepository.userExist(email);
    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15)
    const tokenCreated = await this.passwordsRepository.createToken(user.id, token, expiresAt)

    return !!tokenCreated.token
  }

  async chagePasswordWithOld(email: string, body: ChangePassworType): Promise<number> {
    const user = await this.passwordsRepository.userExist(email);
    await this.passwordsRepository.passwordMatch(body.oldPassword, user.password)
    await this.passwordsRepository.createPasswordHistory(user.id, user.password);
    const passwordHash = await this.hashPassword(body.password);
    const userUpdated = await this.passwordsRepository.changePassword(user.id, passwordHash);

    return userUpdated.id
  }

  async changePasswordWithToken(email: string, token: string, body: ChangePasswordTokenType): Promise<number> {
    const user = await this.passwordsRepository.userExist(email);
    await this.passwordsRepository.tokenExist(token, user.id)
    await this.passwordsRepository.createPasswordHistory(user.id, user.password);
    await this.passwordsRepository.useToken(token)
    const passwordHash = await this.hashPassword(body.password);

    const userUpdated = await this.passwordsRepository.changePassword(user.id, passwordHash);

    return userUpdated.id
  }

  private async hashPassword(password: string): Promise<string> {
    return await hashpassword(password);
  }

}
