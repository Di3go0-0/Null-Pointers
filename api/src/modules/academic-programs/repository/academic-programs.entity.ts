import { AcademicProgramEntity } from "../entities";
import { PatchAcademicProgramType, PostAcademicProgramType } from "../types";

export abstract class AcademicProgramsRepository {
  abstract findAcademicPrograms(): Promise<AcademicProgramEntity[]>;
  abstract findAcademicProgramById(id: number): Promise<AcademicProgramEntity[]>;
  abstract saveAcademicProgram(body: PostAcademicProgramType): Promise<number>;
  abstract updateAcademicProgram(id: number, body: PatchAcademicProgramType): Promise<number>;
  abstract deleteAcademicProgram(id: number): Promise<number>;
  abstract validateProgramCode(programCode: string): Promise<boolean>;
  abstract validateProgramCodeOwner(id: number, programCode: string): Promise<boolean>;
  abstract existAcademicProgram(id: number): Promise<boolean>;
}
