import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from './repository';
import * as bcrypt from 'bcrypt';
import { RegisterType } from './types';
import { AUTH_MESSAGES } from './constans';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly authRepository: AuthRepository) { }

  async registerRequest(body: RegisterType): Promise<boolean> {
    const hashedPassword = await this.hashpassword(body.password);
    return this.authRepository.registerRequest({
      ...body,
      password: hashedPassword
    })
  }

  async hashpassword(password: string): Promise<string> {
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
