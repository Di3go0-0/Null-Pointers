import { SetMetadata } from '@nestjs/common';
import { RoleName } from '@prisma/client';

export const ROLES_KEY = 'roles'; // Una clave única para los metadatos
export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles);
