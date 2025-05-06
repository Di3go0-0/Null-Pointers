import { Injectable } from '@nestjs/common';
import { ParentsInfoRepository } from './repository';
import { ParentsInfoEntity } from './entities';
import { PatchParentsInfoType, PostParentsInfoType } from './types';

@Injectable()
export class ParentsInfoService {
  constructor(private readonly parentsInfoRepository: ParentsInfoRepository) { }

  async getParentInfoById(userId: number, parentsInfoId: number): Promise<ParentsInfoEntity[]> {
    await this.parentsInfoRepository.existStudent(userId);
    return this.parentsInfoRepository.getParentInfoById(userId, parentsInfoId);
  }
  async getParentsInfo(userId: number): Promise<ParentsInfoEntity[]> {
    await this.parentsInfoRepository.existStudent(userId);
    return await this.parentsInfoRepository.getParentsInfo(userId);
  }
  async postParentsInfo(userId: number, body: PostParentsInfoType): Promise<number> {
    await this.parentsInfoRepository.existStudent(userId);
    return await this.parentsInfoRepository.postParentsInfo(userId, body);
  }
  async patchTeacher(userId: number, parentsInfoId: number, body: PatchParentsInfoType): Promise<number> {
    await this.parentsInfoRepository.existStudent(userId);
    await this.parentsInfoRepository.existParentInfo(parentsInfoId);
    return this.parentsInfoRepository.patchTeacher(userId, parentsInfoId, body);
  }
}

