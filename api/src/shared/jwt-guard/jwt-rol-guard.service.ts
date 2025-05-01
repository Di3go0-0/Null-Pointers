
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleName } from 'generated/prisma';
import { ROLES_KEY } from '../decorators';

interface UserWithRole {
  id: number;
  email: string;
  active: boolean;
  role: {
    id: number;
    name: RoleName;
  };
}

interface RoleI {
  roleName: string
}

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleName[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      this.logger.verbose('No se requieren roles específicos para esta ruta.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserWithRole;
    const nameRol = request.user.roleName as RoleI;
    console.log(nameRol)
    if (!user || !nameRol) {
      this.logger.warn('Intento de acceso a ruta con roles sin usuario válido adjunto.');
      throw new ForbiddenException('No tienes permiso para acceder a este recurso (usuario no encontrado).');
    }

    const hasRequiredRole = requiredRoles.some((role) => nameRol.roleName === role);

    if (hasRequiredRole) {
      this.logger.log(`Acceso permitido para usuario ${user.email} con rol ${nameRol.roleName}.`);
      return true;
    } else {
      this.logger.warn(`Acceso denegado para usuario ${user.email} con rol ${user.role.name}.Roles requeridos: ${requiredRoles.join(', ')}`);
      throw new ForbiddenException('No tienes los permisos necesarios para realizar esta acción.');
    }
  }
}
