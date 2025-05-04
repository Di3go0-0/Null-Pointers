import { TeacherEntity } from '../entities';
import { Decimal } from '@prisma/client/runtime/library';

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
   * @mapper
   */
  public static toDomain(teacherData: TeacherWithRelations): TeacherEntity {
    return {
      id: teacherData.id,
      name: teacherData.user?.name ?? '',
      email: teacherData.user?.email ?? '',
      contractName: teacherData.contractType?.typeName ?? '',
      specialty: teacherData.specialty ?? '',
      experience: teacherData.experience ?? '',
      baseSalary: teacherData.baseSalary?.toNumber() ?? 0,
    };
  }

  public static toDomainOne(teachersData: TeacherWithRelations[]): TeacherEntity[] {
    return teachersData
      .filter(teacher => teacher.user !== null)
      .map(this.toDomain);
  }

  public static toDomainList(teachersData: TeacherWithRelations[]): TeacherEntity[] {
    return teachersData
      .filter(teacher => teacher.user !== null)
      .map(this.toDomain);
  }
}

