import { Injectable } from '@nestjs/common';
import { TeachersRepository } from './reporitory/teachers.repository';
import { PatchTeacherType, PostTeacherType } from './types';
import { TeacherEntity } from './entities';
import { hashpassword } from '../auth/helpers';

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

  async postTeacher(body: PostTeacherType): Promise<number> {
    await this.teachersRepository.userNew(body.email);
    const hashedPassword = await hashpassword(body.password);
    return await this.teachersRepository.saveTeacher({ ...body, password: hashedPassword });
  }

  async patchTeacher(userId: number, body: PatchTeacherType): Promise<number> {
    await this.teachersRepository.existTeacher(userId);
    return this.teachersRepository.patchTeacher(userId, body);
  }

  private async searchRole() {
    this.roleId = await this.teachersRepository.searchRole('TEACHER');
  }
}
