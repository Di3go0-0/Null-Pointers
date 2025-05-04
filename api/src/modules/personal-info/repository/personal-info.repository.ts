import { PatchPersonalInfoType, PersonalInfoType, PostPersonalInfoType } from "../types";

export abstract class PersonalInfoRepository {
  abstract getPersonalInfo(userId: number): Promise<PersonalInfoType[]>;
  abstract postPersonalInfo(userId: number, body: PostPersonalInfoType): Promise<number>;
  abstract patchPersonalInfo(userId: number, body: PatchPersonalInfoType): Promise<number>;
}
