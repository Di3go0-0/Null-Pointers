import { Injectable } from '@nestjs/common';
import { TeachersRepository } from './reporitory/teachers.repository';
import { PatchTeacherType, PostTeacherType } from './types';
import { TeacherEntity } from './entities';

@Injectable()
export class TeachersService {
  constructor(private readonly teachersRepository: TeachersRepository) { }

  async getTeachers(): Promise<TeacherEntity[]> {
    return this.teachersRepository.getTeachers();
  }

  async postTeacher(userId: number, body: PostTeacherType): Promise<number> {
    return this.teachersRepository.postTeacher(userId, body);
  }

  async patchTeacher(userId: number, body: PatchTeacherType): Promise<number> {
    return this.teachersRepository.patchTeacher(userId, body);
  }
}
