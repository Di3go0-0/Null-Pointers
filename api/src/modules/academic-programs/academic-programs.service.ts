import { Injectable } from '@nestjs/common';
import { AcademicProgramsRepository } from './repository';
import { AcademicProgramEntity } from './entities';
import { PatchAcademicProgramType, PostAcademicProgramType } from './types';

@Injectable()
export class AcademicProgramsService {
  constructor(private readonly academicProgramsRepository: AcademicProgramsRepository) { }

  async findAcademicPrograms(): Promise<AcademicProgramEntity[]> {
    return this.academicProgramsRepository.findAcademicPrograms();
  }
  async findAcademicProgramById(id: number): Promise<AcademicProgramEntity[]> {
    await this.academicProgramsRepository.existAcademicProgram(id);
    return this.academicProgramsRepository.findAcademicProgramById(id);
  }
  async saveAcademicProgram(body: PostAcademicProgramType): Promise<number> {
    await this.academicProgramsRepository.validateProgramCode(body.programCode);
    return this.academicProgramsRepository.saveAcademicProgram(body);
  }
  async updateAcademicProgram(id: number, body: PatchAcademicProgramType): Promise<number> {
    await this.academicProgramsRepository.existAcademicProgram(id);
    if (body.programCode != null)
      await this.academicProgramsRepository.validateProgramCodeOwner(id, body.programCode);
    return this.academicProgramsRepository.updateAcademicProgram(id, body);
  }
  async deleteAcademicProgram(id: number): Promise<number> {
    await this.academicProgramsRepository.existAcademicProgram(id);
    return this.academicProgramsRepository.deleteAcademicProgram(id);
  }
}
