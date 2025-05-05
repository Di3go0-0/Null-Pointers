import { Injectable } from '@nestjs/common';
import { TeachersRepository } from './reporitory/teachers.repository';
import { PatchTeacherType, PostTeacherType } from './types';
import { TeacherEntity } from './entities';

@Injectable()
export class TeachersService {
  private roleId: number;

  constructor(private readonly teachersRepository: TeachersRepository) { }

  async onModuleInit() {
    await this.searchRole()
  }

  async getTeacherById(id: number): Promise<TeacherEntity[]> {
    return this.teachersRepository.getTeacherById(id, this.roleId);
  }
  async getTeachers(): Promise<TeacherEntity[]> {
    return this.teachersRepository.getTeachers(this.roleId);
  }

  async postTeacher(userId: number, body: PostTeacherType): Promise<number> {
    await this.teachersRepository.existUser(userId)
    await this.teachersRepository.updateUserRol(userId, this.roleId);
    return this.teachersRepository.postTeacher(userId, body);
  }

  async patchTeacher(userId: number, body: PatchTeacherType): Promise<number> {
    await this.teachersRepository.existTeacher(userId);
    return this.teachersRepository.patchTeacher(userId, body);
  }

  private async searchRole() {
    this.roleId = await this.teachersRepository.searchRole('TEACHER');
  }
}
