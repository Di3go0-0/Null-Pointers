import { AcademicProgramEntity } from '../entities';

type AcademicProgramModel = {
  id: number;
  programName: string;
  programCode: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
};

export class TeacherMapper {
  /**
   * @mapper
   */
  public static toDomain(data: AcademicProgramModel): AcademicProgramEntity {
    return {
      id: data.id,
      programName: data.programName,
      programCode: data.programCode,
      description: data.description,
    };
  }

  public static toDomainList(data: AcademicProgramModel[]): AcademicProgramEntity[] {
    return data
      .map(this.toDomain);
  }
}

