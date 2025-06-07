import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './repository/students.repository';
import { StudentEntity } from './entities';
import { RegisterType } from '../auth/types';
import { hashpassword } from '../auth/helpers';
import { PatchStudentType } from './types/patch.student.type';

@Injectable()
export class StudentsService {
  private roleId: number;

  constructor(private readonly studentsRepository: StudentsRepository) { }

  async onModuleInit() {
    await this.searchRole()
  }

  async getStudentById(id: number): Promise<StudentEntity[]> {
    return await this.studentsRepository.getStudentById(id, this.roleId);
  }

  async getStudents(): Promise<StudentEntity[]> {
    return await this.studentsRepository.getStudents(this.roleId);
  }

  async postStudent(body: RegisterType): Promise<number> {
    await this.studentsRepository.existUser(body.email);
    const hashedPassword = await hashpassword(body.password);
    return await this.studentsRepository.postStudent({ ...body, password: hashedPassword })
  }

  async patchStudent(id: number, body: PatchStudentType): Promise<number> {
    await this.studentsRepository.existStudent(id);
    return await this.studentsRepository.patchStudent(id, body);
  }

  private async searchRole() {
    this.roleId = await this.studentsRepository.searchRole('STUDENT');
  }
}
