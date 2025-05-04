import { Injectable } from '@nestjs/common';
import { TeachersRepository } from './reporitory/teachers.repository';
import { PatchTeacherType, PostTeacherType } from './types';
import { TeacherEntity } from './entities';

@Injectable()
export class TeachersService {
  constructor(private readonly teachersRepository: TeachersRepository) { }

  async getTeacherById(id: number): Promise<TeacherEntity[]> {
    return this.teachersRepository.getTeacherById(id);
  }
  async getTeachers(): Promise<TeacherEntity[]> {
    return this.teachersRepository.getTeachers();
  }

  async postTeacher(userId: number, body: PostTeacherType): Promise<number> {
    const roleId = await this.teachersRepository.searchRole('TEACHER');
    await this.teachersRepository.existUser(userId)
    await this.teachersRepository.updateUserRol(userId, roleId);
    return this.teachersRepository.postTeacher(userId, body);
  }

  async patchTeacher(userId: number, body: PatchTeacherType): Promise<number> {
    await this.teachersRepository.existTeacher(userId);
    return this.teachersRepository.patchTeacher(userId, body);
  }
}
