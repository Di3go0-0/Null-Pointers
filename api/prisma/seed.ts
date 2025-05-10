import { PrismaClient } from '../generated/prisma';
import { RoleName } from '../generated/prisma';

const prisma = new PrismaClient();

const userData = {
  roleId: 1,
  name: 'Pepito',
  email: 'pepito@correo.com',
  password: '$2b$10$G6X9E2LR0Wpn5oV4dHEx.uBCljkS6babz58lDxevzQ3sFI4W/65Jq',
}

async function main() {
  console.log('Iniciando seed de datos básicos...');

  // Crear los roles básicos
  const adminRole = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      roleName: RoleName.ADMIN,
      active: true,
    },
  });

  const teacherRole = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      roleName: RoleName.TEACHER,
      active: true,
    },
  });

  const studentRole = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      roleName: RoleName.STUDENT,
      active: true,
    },
  });

  console.log('Roles creados:', { adminRole, teacherRole, studentRole });

  // Crea el Usuario Admin:
  const admin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      ...userData,
    }
  })

  console.log('Admin Creado', { admin });
}

main()
  .catch((e) => {
    console.error('Error durante el proceso de seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

