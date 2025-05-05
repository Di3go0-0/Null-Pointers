import { StudentEntity } from '../entities';

type StudentWithRelations = {
  id: number;
  user: {
    name: string;
    email: string;
  };
};

export class StudentMapper {
  /**
   * @mapper
   */
  public static toDomain(data: StudentWithRelations): StudentEntity {
    return {
      id: data.id,
      name: data.user?.name ?? '',
      email: data.user?.email ?? '',
    };
  }

  public static toDomainList(data: StudentWithRelations[]): StudentEntity[] {
    return data
      .filter(student => student.user !== null)
      .map(this.toDomain);
  }
}

