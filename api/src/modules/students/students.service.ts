import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './repository/students.repository';
import { StudentEntity } from './entities';

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

  async postStudent(userId: number): Promise<number> {
    await this.studentsRepository.existUser(userId);
    await this.studentsRepository.existStudent(userId)
    await this.studentsRepository.updateUserRol(userId, this.roleId)

    return await this.studentsRepository.postStudent(userId)
  }

  private async searchRole() {
    this.roleId = await this.studentsRepository.searchRole('STUDENT');
  }
}
