import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from './repository';
import { LoginType, RegisterType } from './types';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { comparePassword, hashpassword } from './helpers';
import { AUTH_MESSAGES } from './constans';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) { }

  async registerUser(body: RegisterType): Promise<number> {
    const hashedPassword = await hashpassword(body.password);
    return await this.authRepository.registerUser({ ...body, password: hashedPassword })
  }

  async login(body: LoginType): Promise<{ token: string }> {
    const userExist = await this.authRepository.getUserByEmail(body.email);
    const passwordMatch = await comparePassword(body.password, userExist.password)
    if (!passwordMatch) {
      this.logger.error(`Login Error, Password Not match: `);
      throw new HttpException(AUTH_MESSAGES.ERROR.PASSWORD_NOT_MATCH, HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.generateToken({ id: userExist.id, email: body.email });
    return { token };
  }


  async getUserInfo(id: number): Promise<any> {
    return await this.authRepository.getUserInfo(id);
  }
}
