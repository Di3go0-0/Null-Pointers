import { Injectable } from '@nestjs/common';
import { PersonalInfoRepository } from './repository';
import { PatchPersonalInfoType, PersonalInfoType, PostPersonalInfoType } from './types';

@Injectable()
export class PersonalInfoService {
  constructor(private readonly personalInfoRepository: PersonalInfoRepository) { }

  async getPersonalInfo(userId: number): Promise<PersonalInfoType[]> {
    return this.personalInfoRepository.getPersonalInfo(userId);
  }
  async postPersonalInfo(userId: number, body: PostPersonalInfoType): Promise<number> {
    return this.personalInfoRepository.postPersonalInfo(userId, body);
  }
  async patchPersonalInfo(userId: number, body: PatchPersonalInfoType): Promise<number> {
    return this.personalInfoRepository.patchPersonalInfo(userId, body);
  }

}
