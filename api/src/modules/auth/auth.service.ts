import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from './repository';
import { LoginType, PatchPersonalInfoType, PostPersonalInfoType, RegisterType } from './types';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { comparePassword, hashpassword } from './helpers';
import { ChangePassworType } from './types/change-password.type';
import { AUTH_MESSAGES } from './constans';
import { ChangePasswordTokenType } from './types/change-password-token';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) { }

  async registerUser(body: RegisterType): Promise<number> {
    const hashedPassword = await hashpassword(body.password);
    const userId = await this.authRepository.searchRole('STUDENT')
    return await this.authRepository.registerUser({ ...body, password: hashedPassword }, userId)
  }

  async login(body: LoginType): Promise<{ token: string }> {
    const userExist = await this.authRepository.existUser(body.email);
    const passwordMatch = await comparePassword(body.password, userExist.password)
    if (!passwordMatch) {
      this.logger.error(`Login Error, Password Not match: `);
      throw new HttpException(AUTH_MESSAGES.ERROR.PASSWORD_NOT_MATCH, HttpStatus.BAD_REQUEST);
    }
    const rol = await this.authRepository.getUserRol(body.email);
    const token = this.jwtService.generateToken({ id: userExist.id, email: body.email, rol });
    return { token };
  }

  async getPersonalInfo(userId: number) {
    return this.authRepository.getPersonalInfo(userId);
  }

  async postPersonalInfo(userId: number, body: PostPersonalInfoType): Promise<number> {
    return this.authRepository.postPersonalInfo(userId, body);
  }
  async patchPersonalInfo(userId: number, body: PatchPersonalInfoType): Promise<number> {
    return this.authRepository.patchPersonalInfo(userId, body);
  }

  async chagePasswordWithOld(userId: number, body: ChangePassworType): Promise<number> {
    const hashedPassword = await hashpassword(body.password);
    return this.authRepository.chagePasswordWithOld(userId, { password: hashedPassword, oldPassword: body.oldPassword })
  }

  async requestPasswordToken(userId: number): Promise<boolean> {
    return !!this.authRepository.requestPasswordToken(userId);
  }

  async changePasswordWithToken(userId: number, token: string, body: ChangePasswordTokenType): Promise<number> {
    const password = await hashpassword(body.password);
    return this.authRepository.changePasswordWithToken(userId, token, { password });
  }

}
