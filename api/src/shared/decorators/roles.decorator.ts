import { SetMetadata } from '@nestjs/common';
import { RoleName } from 'generated/prisma'; // Asegúrate que la ruta sea correcta

export const ROLES_KEY = 'roles'; // Una clave única para los metadatos
export const Roles = (...roles: RoleName[]) => SetMetadata(ROLES_KEY, roles);
