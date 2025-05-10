import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { $Enums, RoleName } from '@prisma/client';

interface UserWithRole {
  id: number;
  roleId: number;
  name: string;
  email: string;
  role: {
    roleName: $Enums.RoleName;
  } | null;
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

    if (!requiredRoles?.length) {
      this.logger.verbose('No specific roles required for this route.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserWithRole;

    if (!user?.role?.roleName) {
      this.logger.warn('User without a valid role or not authenticated.');
      throw new ForbiddenException('Access denied: invalid user or missing role.');
    }

    const hasRequiredRole = requiredRoles.includes(user.role.roleName);

    if (hasRequiredRole) {
      this.logger.log(`Access granted: ${user.email} - Role: ${user.role.roleName}`);
      return true;
    }
    this.logger.warn(`Access denied: ${user.email} - Role: ${user.role.roleName}. Required roles: ${requiredRoles.join(', ')}`);
    throw new ForbiddenException('You do not have sufficient permissions.');
  }
}
