import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenProps } from '../types/token.type';

declare module 'express' {
  interface Request {
    user?: TokenProps | any;
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
      this.logger.warn('No se encontró token en la cabecera Authorization');
      throw new UnauthorizedException('Se requiere token de autenticación.');
    }
    if (!token) {
      this.logger.warn('No se encontró token en la cabecera Authorization');
      throw new UnauthorizedException('Se requiere token de autenticación.');
    }

    try {
      const payload = await this.jwtService.verifyToken(token);

      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
          active: true,
        },
        // include: { role: true } 
      });

      if (!user) {
        this.logger.warn(`Usuario con ID ${payload.id} del token no encontrado o inactivo.`);
        throw new UnauthorizedException('Usuario no autorizado.');
      }

      request.user = user;

      this.logger.log(`Usuario ID ${user.id} autenticado exitosamente.`); // Opcional

    } catch (error) {
      this.logger.error(`Error de autenticación: ${error.message}`);

      if (error instanceof UnauthorizedException) {
        throw error; // Re-lanzar si ya es UnauthorizedException
      }
      throw new UnauthorizedException('Token inválido o expirado.');
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
