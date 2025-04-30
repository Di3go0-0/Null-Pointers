import { TeacherEntity } from '../entities';
import { Decimal } from '@prisma/client/runtime/library';

// Definimos un tipo para los datos que vienen de Prisma con sus relaciones
type TeacherWithRelations = {
  id: number;
  specialty: string | null;
  experience: string | null;
  baseSalary: Decimal | null;
  user: {
    name: string;
    email: string;
  } | null;
  contractType: {
    id: number;
    typeName: string;
    allowsExtensionCourse: boolean;
    affectsSalary: boolean;
  } | null;
};

export class TeacherMapper {
  /**
   * Convierte un teacher de Prisma con sus relaciones a una entidad de dominio
   */
  public static toDomain(teacherData: TeacherWithRelations): TeacherEntity {
    return {
      id: teacherData.id,
      name: teacherData.user?.name ?? 'Usuario no disponible',
      email: teacherData.user?.email ?? 'email@no.disponible',
      contract: teacherData.contractType ? {
        id: teacherData.contractType.id,
        typeName: teacherData.contractType.typeName,
        allowsExtensionCourse: teacherData.contractType.allowsExtensionCourse,
        affectsSalary: teacherData.contractType.affectsSalary,
      } : null,
      specialty: teacherData.specialty,
      experience: teacherData.experience,
      baseSalary: teacherData.baseSalary ? teacherData.baseSalary.toNumber() : null,
    };
  }

  /**
   * Convierte una lista de teachers de Prisma a entidades de dominio
   */
  public static toDomainList(teachersData: TeacherWithRelations[]): TeacherEntity[] {
    return teachersData
      .filter(teacher => teacher.user !== null)
      .map(this.toDomain);
  }
}

