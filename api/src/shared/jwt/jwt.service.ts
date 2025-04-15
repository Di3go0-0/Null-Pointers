import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ENV } from '../constans';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { GenerateTokenProps, TokenProps } from '../types/token.type';
import { JWT_MESSAGES } from './constans/jwt.constans';



@Injectable()
export class JwtService {
  private readonly logger = new Logger(JwtService.name);
  private readonly secret: string;

  constructor(
    private readonly jwtService: NestJwtService,
  ) {
    this.secret = ENV.CONSTANS.SECRET_KEY;
  }

  generateToken(payload: GenerateTokenProps): string {
    console.log(this.secret)
    return this.jwtService.sign(payload, {
      secret: this.secret,
      expiresIn: '12h',
    });
  }

  async verifyToken(token: string): Promise<TokenProps> {
    try {
      const decoded = await this.jwtService.verifyAsync<TokenProps>(token, {
        secret: this.secret,
      });
      return decoded;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(JWT_MESSAGES.ERROR.FAILED_VERIFICATION, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserId(token: string): Promise<number> {
    const payload = await this.verifyToken(token);
    return payload.id;
  }

}
