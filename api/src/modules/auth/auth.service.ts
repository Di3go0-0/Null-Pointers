import { Injectable, Logger } from '@nestjs/common';
import { AuthRepository } from './repository';
import { LoginType, RegisterType } from './types';
import { JwtService } from 'src/shared/jwt/jwt.service';
import { hashpassword } from './helpers';

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
    const rol = await this.authRepository.getUserRol(body.email);
    const token = this.jwtService.generateToken({ id: userExist, email: body.email, rol });
    return { token };
  }

  // async getUserRol(
}
