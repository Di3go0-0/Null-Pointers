import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from './repository';
import * as bcrypt from 'bcrypt';
import { LoginType, RegisterType } from './types';
import { AUTH_MESSAGES } from './constans';
import { JwtService } from 'src/shared/jwt/jwt.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService
  ) { }

  async registerStudentRequest(body: RegisterType): Promise<number> {
    const hashedPassword = await this.hashpassword(body.password);

    return await this.authRepository.registerStudentRequest({
      ...body,
      password: hashedPassword
    })

  }

  async registerTeacherRequest(body: RegisterType): Promise<number> {
    const hashedPassword = await this.hashpassword(body.password);

    return await this.authRepository.registerTeacherRequest({
      ...body,
      password: hashedPassword
    })

  }

  async login(body: LoginType): Promise<{ token: string }> {
    const userExist = await this.authRepository.existUser(body.email);
    const rol = await this.authRepository.getUserRol(body.email);

    const token = this.jwtService.generateToken({ id: userExist, email: body.email, rol });

    return { token };
  }

  private async hashpassword(password: string): Promise<string> {
    // Hash de la contraseña
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;

    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(AUTH_MESSAGES.ERROR.HASED_PASSWORD, HttpStatus.BAD_REQUEST);
    }
  }

}
