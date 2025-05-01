import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { TokenProps } from '../types/token.type';
import { PrismaService } from '../prisma/prisma.service';
import { $Enums } from 'generated/prisma';

declare module 'express' {
  interface Request {
    user?: TokenProps | {
      id: number;
      roleId: number;
      name: string;
      email: string;
      role: {
        roleName: $Enums.RoleName;
      } | null;
    } | null
  }
}

@Injectable()
export class JwtGuardService implements CanActivate {
  private readonly logger = new Logger(JwtGuardService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('No token found in Authorization header');
      throw new UnauthorizedException('Authentication token required.');
    }

    try {
      const payload = await this.jwtService.verifyToken(token);

      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
          email: payload.email,
          active: true,
        },
        select: {
          id: true,
          email: true,
          name: true,
          roleId: true,
          role: {
            select: {
              roleName: true
            }
          }
        }
      });

      if (!user) {
        this.logger.warn(`User with ID ${payload.id} from token not found or inactive.`);
        throw new UnauthorizedException('Unauthorized user.');
      }
      request.user = user;
    } catch (error) {
      this.logger.error(`Authentication error: ${error.message}`);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token.');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');

    // Verifica que el tipo sea 'Bearer' (insensible a mayúsculas/minúsculas)
    return type.toLowerCase() === 'bearer' ? token : undefined;
  }
}
