import { Injectable } from '@nestjs/common';
import { TeachersRepository } from './reporitory/teachers.repository';
import { AddContractType } from './types';
import { TeacherEntity } from './entities';

@Injectable()
export class TeachersService {
  constructor(private readonly teachersRepository: TeachersRepository) { }

  async getTeachers(): Promise<TeacherEntity[]> {
    return this.teachersRepository.getTeachers();
  }
  async AddContractsType(id: number, body: AddContractType): Promise<number> {
    return this.teachersRepository.AddContractsType(id, body);
  }
}
