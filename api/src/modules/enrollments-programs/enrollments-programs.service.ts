import { Injectable } from '@nestjs/common';
import { EnrollmentsProgramsRepository } from './repository';
import { EnrollmentsProgramsType } from './types/enrollments-programs.type';
import { PostEnrollmentsProgramsType, PatchEnrollmentsProgramsType } from './types';
import { GetEnrollmentsProgramsType } from './types/get.enrollments-programs.type';

@Injectable()
export class EnrollmentsProgramsService {
  constructor(private readonly enrollmentsProgramsRepository: EnrollmentsProgramsRepository) { }

  async find(): Promise<EnrollmentsProgramsType[]> {
    return await this.enrollmentsProgramsRepository.find();
  }

  async findSearch(params: GetEnrollmentsProgramsType): Promise<EnrollmentsProgramsType[]> {
    return await this.enrollmentsProgramsRepository.findSearch(params);
  }

  async save(body: PostEnrollmentsProgramsType): Promise<number> {
    await this.enrollmentsProgramsRepository.existStudent(body.studentId);
    await this.enrollmentsProgramsRepository.existAcademicProgram(body.academicProgramId);
    await this.enrollmentsProgramsRepository.studentAlreadyEnrollment(body.studentId, body.academicProgramId)
    return await this.enrollmentsProgramsRepository.save(body);
  }

  async update(id: number, body: PatchEnrollmentsProgramsType): Promise<number> {
    if (body.studentId) await this.enrollmentsProgramsRepository.existStudent(body.studentId);
    if (body.academicProgramId) await this.enrollmentsProgramsRepository.existAcademicProgram(body.academicProgramId);
    return await this.enrollmentsProgramsRepository.update(id, body);
  }
}
